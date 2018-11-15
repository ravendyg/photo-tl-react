import { IHttp } from './Http';
import { IResponseContainer } from '../types';

export interface ISocketMessage {
    action: number
    payload: any;
};

export type TAction = 'connect' | 'error' | 'disconnect' | 'message';

type TTransport = 'ws' | 'lp';
type TStatus = 'disconnected' | 'connected';

export interface IWebSocketService {
    connect: (
        handleConnect: () => void,
        handleMessage: (message: any) => void,
        handleError: (status: string, message: string) => void,
        protocolStr?: string,
    ) => void;

    disconnect: () => void;

    sendMessage: (message: ISocketMessage) => void;

    subscribe: <T>(action: TAction, cb: (payload: T) => void) => () => void;
}

export class WebSocketService implements IWebSocketService {
    static RETRY_AFTER = 1 * 1000;
    static WAIT_BEFORE_STATUS_CHANGE = 300;
    static RETRY_ATTEMPTS = 3;

    private listeners: {
        [action: string]: ((payload?: any) => void)[];
    } = {};

    private transportType: TTransport = 'ws';
    private status: TStatus = 'disconnected';
    // set after first successfully received message
    private connectionIsStable: boolean = false;
    private socket: WebSocket | null = null;
    private wsAttemptsLeft: number = WebSocketService.RETRY_ATTEMPTS;
    private lpAttemptsLeft: number = WebSocketService.RETRY_ATTEMPTS;
    private retryTimeout = -1;
    private messageQueue: ISocketMessage[] = [];
    private sendingOverHttp = false;

    private connectHandler: (() => void) | null = null;
    private handleMessage: ((message: any) => void) | null = null;
    private disconnectHandler: ((status: string, message: string) => void) | null = null;

    private protocolStr?: string;

    constructor (private url: string, private http: IHttp) { }

    connect(
        handleConnect: () => void,
        handleMessage: (message: string | ArrayBuffer) => void,
        handleDisconnect: (status: string, msg: string) => void,
        protocolStr?: string,
    ) {
        if (protocolStr) {
            this.protocolStr = protocolStr;
        }
        this.reset(true);
        this.connectHandler = handleConnect;
        this.handleMessage = handleMessage;
        this.disconnectHandler = handleDisconnect;

        if (this.status === 'disconnected') {
            this.reset(true);
            this.connectWs();
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
        Object.keys(this.listeners).forEach(action => {
            delete this.listeners[action];
        });
    }

    subscribe<T>(action: string, cb: (payload: T) => void) {
        if (!Boolean(this.listeners[action])) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(cb);

        return () => {
            this.listeners[action] = this.listeners[action].filter(_cb => _cb !== cb);
        };
    }

    sendMessage(message: ISocketMessage) {
        if (this.status !== 'connected') {
            this.messageQueue.push(message);
        } else if (this.transportType === 'ws') {
            // TODO: check this.socket.readyState === 1
            if (this.socket) {
                this.socket.send(JSON.stringify(message));
            }
        } else {
            this.messageQueue.push(message);
            this.startSendingOverHttp();
        }
    }

    private reset(resetCounters: boolean) {
        this.connectionIsStable = false;
        if (resetCounters) {
            this.wsAttemptsLeft = WebSocketService.RETRY_ATTEMPTS;
            this.lpAttemptsLeft = WebSocketService.RETRY_ATTEMPTS;
        }
        clearTimeout(this.retryTimeout);
        this.status = 'disconnected';
    }

    private connectWs = () => {
        this.wsAttemptsLeft--;
        let args: string[] = [];
        if (this.protocolStr) {
            args.push(this.protocolStr);
        }
        this.socket = new WebSocket(`${this.url.replace(/^http/, 'ws')}/ws`, ...args);
        this.socket.addEventListener('open', () => {
            this.transportType = 'ws';
            this.handleOpen();
        });
        this.socket.addEventListener('message', this.listenWs);
        this.socket.addEventListener('close', this.handleDisconnect);
    }

    private connectLp = () => {
        this.lpAttemptsLeft--;
        this.transportType = 'lp';
        this.handleOpen();
        let headers;
        if (this.protocolStr) {
            headers = { token: this.protocolStr };
        } else {
            headers = {};
        }
        this.http.get(`${this.url}/lp`, { headers })
            .then((res: IResponseContainer<string | ArrayBuffer>) => {
                const { status, payload } = res;
                if (status !== 200) {
                    this.handleDisconnect(res);
                } else {
                    // message
                    if (payload) {
                        this.processMessage(payload);
                    }
                    this.connectLp();
                }
            })
            .catch(this.handleDisconnect);
    }

    private handleOpen = () => {
        if (this.connectHandler) {
            this.connectHandler();
        }
    }

    private listenWs = ({ data }: MessageEvent) => {
        if (data) {
            this.processMessage(data);
        }
    }

    private processMessage = (message: any) => {
        this.connectionIsStable = true;
        if (this.handleMessage) {
            this.handleMessage(message);
        }
    }

    private handleDisconnect = (err: any) => {
        // fallback to LP
        if (err && err.code === 1006) {
            this.wsAttemptsLeft = 0;
        }
        if (err && err.status === 504 || this.connectionIsStable) {
            // timeout, it's OK for LP
            this.reset(true);
        } else {
            // another unsuccessfull attempt to connect
            this.reset(false);
        }

        let status = 'connecting';
        let message = 'Connecting...';

        if (this.wsAttemptsLeft > 0) {
            this.retryTimeout = setTimeout(this.connectWs, WebSocketService.RETRY_AFTER) as any as number;
        } else if (this.lpAttemptsLeft > 0) {
            this.retryTimeout = setTimeout(this.connectLp, WebSocketService.RETRY_AFTER) as any as number;
        } else {
            status = 'disconnected';
            message = 'Cannot connect';
        }
        if (this.disconnectHandler) {
            this.disconnectHandler(status, message);
        }
    }

    private startSendingOverHttp() {
        // https://github.com/parcel-bundler/parcel/issues/954
        let pm: Promise<any> = Promise.resolve();
        if (!this.sendingOverHttp) {
            while (this.messageQueue.length > 0) {
                const message = this.messageQueue.shift();
                this.sendingOverHttp = true;
                pm = pm
                    .then(() => this.http.post(`${this.url}/lp`, { body: message }))
                    .catch(console.error);
            }
        }
    }
}
