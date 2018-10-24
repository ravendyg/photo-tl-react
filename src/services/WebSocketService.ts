import {IHttp} from './Http';

export interface ISocketMessage {
    action: number
    payload: any;
};

export type TAction = 'connect' | 'error' | 'disconnect' | 'message';

export interface IWebSocketService {
    connect: (
        handleConnect: () => void,
        handleError: (message: string) => void,
    ) => void;

    disconnect: () => void;

    sendMessage: (message: ISocketMessage) => void;

    subscribe: <T>(action: TAction, cb: (payload: T) => void) => () => void;
}

export class WebSocketService implements IWebSocketService {
    static RETRY_AFTER = 1 * 1000;
    static PING_PERIOD = 30 * 1000;
    static RETRY_ATTEMPTS = 3;

    private listeners: {
        [action: string]: ((payload?: Object) => void)[];
    } = {};

    // 'ws' or 'lp'
    private type: string;
    // 'disconnected' or 'connected'
    private status: string;
    private socket: WebSocket;
    private wsAttemptsLeft: number;
    private lpAttemptsLeft: number;
    private retryTimeout = -1;
    private wsPingInterval = -1;
    private messageQueue: ISocketMessage[] = [];
    private sendingOverHttp = false;

    private connectHandlers: (() => void)[] = [];
    private disconnectHandlers: ((message: string) => void)[] = [];

    constructor(private url: string, private http: IHttp) { }

    connect(handleConnect, handleDisconnect) {
        this.reset(true);
        this.connectHandlers.push(handleConnect);
        this.disconnectHandlers.push(handleDisconnect);

        if (this.status === 'disconnected') {
            clearInterval(this.wsPingInterval);
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
        } else if (this.type === 'ws') {
            // TODO: check this.socket.readyState === 1
            this.socket.send(JSON.stringify(message));
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
        clearInterval(this.wsPingInterval);
        clearTimeout(this.retryTimeout);
        this.status = 'disconnected';
    }

    private connectWs = () => {
        this.wsAttemptsLeft--;
        this.socket = new WebSocket(`${this.url.replace(/^http/, 'ws')}/ws`);
        this.socket.addEventListener('open', () => {
            this.type = 'ws';
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
                    this.type = 'lp';
                    this.handleOpen();
                }
            })
            .catch(this.handleDisconnect);
    }

    private handleOpen = () => {
        this.status = 'connected';
        if (this.type === 'ws') {
            this.wsPingInterval = setInterval(this.heartBeet, WebSocketService.PING_PERIOD) as any as number;
            // TODO: send every message in the queue
        } else {

        }
        this.connectHandlers.forEach(handler => handler());
    }

    private listen = ({ data }: MessageEvent) => {
        console.log(data);
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
        } else {
            this.disconnectHandlers.forEach(handler => handler('Cannot connect'));
        }
    }

    private heartBeet = () => {
        // do not send heart beet over http or if not connected
        if (this.type === 'ws' && this.status === 'connected') {
            this.socket.send('');
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
                        .then(() => this.http.post(`${this.url}/lp`, message))
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
