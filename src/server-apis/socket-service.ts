import {
    TComment,
    TDeleteDTO,
    IImage,
    TRating,
    TView
} from '../../typings/types';
import {
    IActionCreators,
    IStore,
    ISocketService
} from '../../typings/interfaces';

const config: (query: any) => string = require('./../config.ts');

const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
const store: IStore = require('./../store.ts').Store;
import { Actions } from '../action-creators';

interface ISocketMessage {
    [key: string]: string | number;
    action: string
};

class SocketServiceClass implements ISocketService {
    static RETRY_AFTER = 1 * 1000;
    static PING_PERIOD = 50 * 1000; // jetty closes after 1 min

    private _socket: WebSocket;
    private _connectRetry: boolean;
    private _retryTimeout: number;
    private _pingInterval: number;
    private _messageQueu: ISocketMessage[] = [];

    public connect = () => {
        this._connectRetry = false;
        this._socket = new WebSocket(`${config('url')}${config('port')}/socket`.replace(/^http/, 'ws'));
        this._socket.addEventListener('open', this._handleOpen);
        this._socket.addEventListener('message', this._listen);
        this._socket.addEventListener('close', this._handleDisconnect);
        clearInterval(this._pingInterval);
        this._pingInterval = setInterval(() => {
            this._sendMessage()
        }, SocketServiceClass.PING_PERIOD);
    };

    public disconnect () {
        clearTimeout(this._retryTimeout);
        clearInterval(this._pingInterval);
        this._socket.removeEventListener('message', this._listen);
        this._socket.removeEventListener('close', this._handleDisconnect);
        this._socket.close();
        this._socket = null;
    }

    public getConnection () {
        return this._socket;
    }

    public deletePhoto(iid: string) {
        this._sendMessage({
            action: Actions.DELETE_PHOTO,
            iid
        });
    }

    public uploadPhoto (iid: string, title: string, description: string) {
        this._sendMessage({
            action: Actions.ADD_PHOTO,
            iid,
            title,
            description
        });
    }

    public editPhoto(iid: string, title: string, description: string) {
        this._sendMessage({
            action: Actions.EDIT_PHOTO,
            iid,
            title,
            description
        });
    }

    public vote = (rating: number, iid: string) => {
        this._sendMessage({
            action: Actions.VOTE,
            iid,
            rating
        });
    };

    public postComment(iid: string, text: string) {
        this._sendMessage({
            action: Actions.POST_COMMENT,
            iid,
            text,
        });
    }

    public deleteComment(cid: string) {
        this._sendMessage({
            action: Actions.DELETE_COMMENT,
            cid,
        });
    }

    public registerView(iid: string) {
        this._sendMessage({
            action: Actions.REGISTER_VIEW,
            iid,
        });
    }

    private _handleDisconnect = () => {
        this._socket = null;
        if (this._connectRetry) {
            this._retryTimeout = setTimeout(() => {
                this.connect();
                this._connectRetry = true;
            }, SocketServiceClass.RETRY_AFTER);
        } else {
            this.connect();
            this._connectRetry = true;
        }
    };

    private _handleOpen = () => {
        this._socket.removeEventListener('open', this._handleOpen);
        while (this._messageQueu.length > 0) {
            const message = this._messageQueu.pop();
            this._sendMessage(message);
        }
    };

    private _listen = ({ data }: MessageEvent) => {
        try {
            const { action, payload } = JSON.parse(data);
            switch (action) {
                case Actions.ADD_PHOTO: {
                    return store.dispatch(actionCreators.addPhoto(payload as IImage));
                }

                case Actions.VOTE: {
                    if (payload) {
                        return store.dispatch(actionCreators.votePhoto(payload as TRating));
                    } else {
                        // should display a warning, that an image has not been found?
                    }
                }

                case Actions.EDIT_PHOTO: {
                    if (payload) {
                        return store.dispatch(actionCreators.editPhoto(payload as IImage));
                    }
                }

                case Actions.DELETE_PHOTO: {
                    if (payload) {
                        const id = (payload as TDeleteDTO).id;
                        return store.dispatch(actionCreators.deletePhoto(id));
                    }
                }

                case Actions.POST_COMMENT: {
                    if (payload) {
                        return store.dispatch(
                            actionCreators.postComment(payload as TComment)
                        );
                    }
                }

                case Actions.DELETE_COMMENT: {
                    if (payload) {
                        return store.dispatch(
                            actionCreators.deleteComment(payload as TComment)
                        );
                    }
                }

                case Actions.ADD_VIEWS: {
                    if (payload) {
                        return store.dispatch(
                            actionCreators.addViews(payload as TView)
                        );
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    private _sendMessage(message?: ISocketMessage) {
        if (this._socket) {
            if (this._socket.readyState === 1) {
                this._socket.send(
                    message ? JSON.stringify(message) : ''
                );
            } else {
                this._messageQueu.push(message);
            }
        }
    }
}

export const SocketService = new SocketServiceClass();
