/// <reference path="./../../typings/interfaces.d.ts" />

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

    public connect = () => {
        this._connectRetry = false;
        this._socket = new WebSocket(`${config('url')}${config('port')}/socket`.replace(/^http/, 'ws'));
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

    public postComment (id: string, text: string) {
        this._sendMessage({
            action: 'comment-photo',
            id,
            text,
        });
    }

    // uncomment
    public deleteComment (id: string, cid: string) {
        // this._socket.emit('uncomment-photo', {
        //     id,
        //     cid
        // });
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

    private _listen = ({ data }: MessageEvent) => {
        try {
            const { action, payload } = JSON.parse(data);
            switch (action) {
                case Actions.ADD_PHOTO: {
                    return store.dispatch(actionCreators.addPhoto(payload as ImageType));
                }

                case Actions.VOTE: {
                    if (payload) {
                        return store.dispatch(actionCreators.votePhoto(payload as RatingType));
                    } else {
                        // should display a warning, that an image has not been found?
                    }
                }

                case Actions.EDIT_PHOTO: {
                    if (payload) {
                        return store.dispatch(actionCreators.editPhoto(payload as ImageType));
                    }
                }

                case Actions.DELETE_PHOTO: {
                    if (payload) {
                        const id = (payload as DeleteDTO).id;
                        return store.dispatch(actionCreators.deletePhoto(id));
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
        //this._socket.removeEventListener('close', this.connect);
        // new comment
        // this._socket.addEventListener(`comment-photo`, (newComment) => {
        // this._socket.addEventListener(`message`, (newComment) => {
            // store.dispatch(actionCreators.postComment(newComment));
        // });
        // // delete comment
        // this._socket.on(`uncomment-photo`, (data) => {
        //     store.dispatch(actionCreators.deleteComment(data.id, data.cid));
        // });
    };

    private _stopListen () {
        // // walk around this issues
        // this._socket._callbacks['$remove-photo'] = [];
        // this._socket._callbacks['$upload-photo'] = [];
        // this._socket._callbacks['$edit-photo'] = [];
        // this._socket._callbacks['$vote-photo'] = [];
        // // this._socket._callbacks['$photo-list'] = [];
        // this._socket._callbacks['$comment-photo'] = [];
        // this._socket._callbacks['$uncomment-photo'] = [];
    }

    private _sendMessage(message?: ISocketMessage) {
        if (this._socket) {
            this._socket.send(
                message ? JSON.stringify(message) : ''
            );
        }
    }
}

export const SocketService = new SocketServiceClass();
