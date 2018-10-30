import { IHttp } from './Http';

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
        handleMessage: (message: string | ArrayBuffer) => void,
        handleError: (message: string) => void,
    ) => void;

    disconnect: () => void;

    sendMessage: (message: ISocketMessage) => void;

    subscribe: <T>(action: TAction, cb: (payload: T) => void) => () => void;
}

export class WebSocketService implements IWebSocketService {
    static RETRY_AFTER = 1 * 1000;
    static RETRY_ATTEMPTS = 3;

    private listeners: {
        [action: string]: ((payload?: any) => void)[];
    } = {};

    private transportType: TTransport = 'ws';
    private status: TStatus = 'disconnected';
    private socket: WebSocket | null = null;
    private wsAttemptsLeft: number = WebSocketService.RETRY_ATTEMPTS;
    private lpAttemptsLeft: number = WebSocketService.RETRY_ATTEMPTS;
    private retryTimeout = -1;
    private messageQueue: ISocketMessage[] = [];
    private sendingOverHttp = false;

    private connectHandler: (() => void) | null = null;
    private handleMessage: ((message: string | ArrayBuffer) => void) | null = null;
    private disconnectHandler: ((message: string) => void) | null = null;

    constructor (private url: string, private http: IHttp) { }

    connect(
        handleConnect: () => void,
        handleMessage: (message: string | ArrayBuffer) => void,
        handleDisconnect: (msg: string) => void,
    ) {
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
        if (resetCounters) {
            this.wsAttemptsLeft = WebSocketService.RETRY_ATTEMPTS;
            this.lpAttemptsLeft = WebSocketService.RETRY_ATTEMPTS;
        }
        clearTimeout(this.retryTimeout);
        this.status = 'disconnected';
    }

    private connectWs = () => {
        this.wsAttemptsLeft--;
        this.socket = new WebSocket(`${this.url.replace(/^http/, 'ws')}/ws`);
        this.socket.addEventListener('open', () => {
            this.transportType = 'ws';
            this.handleOpen();
        });
        this.socket.addEventListener('message', this.listen);
        this.socket.addEventListener('close', this.handleDisconnect);
    }

    private connectLp = () => {
        this.lpAttemptsLeft--;
        this.http.get(`${this.url}/lp`)
            .then(({ status, payload }) => {
                if (status !== 200) {
                    this.handleDisconnect();
                } else {
                    this.transportType = 'lp';
                    this.handleOpen();
                }
            })
            .catch(this.handleDisconnect);
    }

    private handleOpen = () => {
        this.status = 'connected';
        if (this.connectHandler) {
            this.connectHandler();
        }
    }

    private listen = ({ data }: MessageEvent) => {
        if (this.handleMessage) {
            this.handleMessage(data);
        }
    }

    private handleDisconnect = () => {
        if (this.status === 'connected') {
            // established connection closed
            this.reset(true);
        } else {
            // another unsuccessfull attempt to connect
            this.reset(false);
        }

        if (this.wsAttemptsLeft > 1) {
            this.retryTimeout = setTimeout(this.connectWs, WebSocketService.RETRY_AFTER) as any as number;
        } else if (this.lpAttemptsLeft > 1) {
            this.retryTimeout = setTimeout(this.connectLp, WebSocketService.RETRY_AFTER) as any as number;
        } else if (this.disconnectHandler) {
            this.disconnectHandler('Cannot connect');
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

// import {
//     TComment,
//     TDeleteDTO,
//     IImage,
//     TRating,
//     TNewViews,
// } from '../../typings/types';
// import {
//     IActionCreators,
//     IStore,
//     ISocketService
// } from '../../typings/interfaces';

// const config: (query: any) => string = require('./../config.ts');

// const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
// const store: IStore = require('./../store.ts').Store;
// import { Actions } from '../action-creators';

// interface ISocketMessage {
//     [key: string]: string | number;
//     action: string
// };

// class SocketServiceClass implements ISocketService {
//     static RETRY_AFTER = 1 * 1000;
//     static PING_PERIOD = 50 * 1000; // jetty closes after 1 min

//     private _socket: WebSocket;
//     private _connectRetry: boolean;
//     private _retryTimeout: number;
//     private _wsPingInterval: number;
//     private _messageQueu: ISocketMessage[] = [];

//     public connect = () => {
//         this._connectRetry = false;
//         this._socket = new WebSocket(`${config('url')}${config('port')}/socket`.replace(/^http/, 'ws'));
//         this._socket.addEventListener('open', this._handleOpen);
//         this._socket.addEventListener('message', this._listen);
//         this._socket.addEventListener('close', this._handleDisconnect);
//         clearInterval(this._wsPingInterval);
//         this._wsPingInterval = setInterval(() => {
//             this._sendMessage()
//         }, SocketServiceClass.PING_PERIOD);
//     };

//     public disconnect () {
//         clearTimeout(this._retryTimeout);
//         clearInterval(this._wsPingInterval);
//         this._socket.removeEventListener('message', this._listen);
//         this._socket.removeEventListener('close', this._handleDisconnect);
//         this._socket.close();
//         this._socket = null;
//     }

//     public getConnection () {
//         return this._socket;
//     }

//     public deletePhoto(iid: string) {
//         this._sendMessage({
//             action: Actions.DELETE_PHOTO,
//             iid
//         });
//     }

//     public uploadPhoto (iid: string, title: string, description: string) {
//         this._sendMessage({
//             action: Actions.ADD_PHOTO,
//             iid,
//             title,
//             description
//         });
//     }

//     public editPhoto(iid: string, title: string, description: string) {
//         this._sendMessage({
//             action: Actions.EDIT_PHOTO,
//             iid,
//             title,
//             description
//         });
//     }

//     public vote = (rating: number, iid: string) => {
//         this._sendMessage({
//             action: Actions.VOTE,
//             iid,
//             rating
//         });
//     };

//     public postComment(iid: string, text: string) {
//         this._sendMessage({
//             action: Actions.POST_COMMENT,
//             iid,
//             text,
//         });
//     }

//     public deleteComment(cid: string) {
//         this._sendMessage({
//             action: Actions.DELETE_COMMENT,
//             cid,
//         });
//     }

//     public registerView(iid: string) {
//         this._sendMessage({
//             action: Actions.REGISTER_VIEW,
//             iid,
//         });
//     }

//     private _handleDisconnect = () => {
//         this._socket = null;
//         if (this._connectRetry) {
//             this._retryTimeout = setTimeout(() => {
//                 this.connect();
//                 this._connectRetry = true;
//             }, SocketServiceClass.RETRY_AFTER);
//         } else {
//             this.connect();
//             this._connectRetry = true;
//         }
//     };

//     private _handleOpen = () => {
//         this._socket.removeEventListener('open', this._handleOpen);
//         while (this._messageQueu.length > 0) {
//             const message = this._messageQueu.pop();
//             this._sendMessage(message);
//         }
//     };

//     private _listen = ({ data }: MessageEvent) => {
//         try {
//             const { action, payload } = JSON.parse(data);
//             switch (action) {
//                 case Actions.ADD_PHOTO: {
//                     return store.dispatch(actionCreators.addPhoto(payload as IImage));
//                 }

//                 case Actions.VOTE: {
//                     if (payload) {
//                         return store.dispatch(actionCreators.votePhoto(payload as TRating));
//                     } else {
//                         // should display a warning, that an image has not been found?
//                     }
//                 }

//                 case Actions.EDIT_PHOTO: {
//                     if (payload) {
//                         return store.dispatch(actionCreators.editPhoto(payload as IImage));
//                     }
//                 }

//                 case Actions.DELETE_PHOTO: {
//                     if (payload) {
//                         const id = (payload as TDeleteDTO).id;
//                         return store.dispatch(actionCreators.deletePhoto(id));
//                     }
//                 }

//                 case Actions.POST_COMMENT: {
//                     if (payload) {
//                         return store.dispatch(
//                             actionCreators.postComment(payload as TComment)
//                         );
//                     }
//                 }

//                 case Actions.DELETE_COMMENT: {
//                     if (payload) {
//                         return store.dispatch(
//                             actionCreators.deleteComment(payload as TComment)
//                         );
//                     }
//                 }

//                 case Actions.ADD_VIEWS: {
//                     if (payload) {
//                         return store.dispatch(
//                             actionCreators.addViews(payload as TNewViews)
//                         );
//                     }
//                 }
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     private _sendMessage(message?: ISocketMessage) {
//         if (this._socket) {
//             if (this._socket.readyState === 1) {
//                 this._socket.send(
//                     message ? JSON.stringify(message) : ''
//                 );
//             } else {
//                 this._messageQueu.push(message);
//             }
//         }
//     }
// }

// export const SocketService = new SocketServiceClass();
