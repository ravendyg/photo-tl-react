/// <reference path="./../../typings/interfaces.d.ts" />

const io = vendor.io;

const config: (query: any) => string = require('./../config.ts');

const actionCreators: IActionCreators = require('./../action-creators.ts').actionCreators;

class SocketServiceClass implements ISocketService {
    private _socket: any;
    private _io: any;
    
    private _actionCreators: IActionCreators;
    
    constructor (io, actionCreators) {

        this._io = io;
        
        // has access to server actions emmiter -> when user action on the client delivered to the server
        // there it should be confirmed and after that server broadcasts server action
        // that would be delivered to the stores
        this._actionCreators = actionCreators;
    }
    
    public connect () {
        this._socket = this._io(config('url') + config('port'));
        this._listen();
    }
    
    public disconnect () {
        this._socket.disconnect();
        this._stopListen();
    }
    
    public getConnection () {
        return this._socket;
    }
    
    // tell the server to remove specified photo
    public removePhoto (_id: string) {
        this._socket.emit('remove-photo', {_id});
    }
    
    // tell the server information about uploaded file
    public uploadPhoto (filename: string, title: string, text: string) {
        this._socket.emit('upload-photo', {
            filename, title, text
        });
    }
    
    // tell the server information about uploaded file
    public editPhoto (id: string, title: string, text: string) {
        this._socket.emit('edit-photo', {
            id, title, text
        });
    }
    
    // vote
    public vote (newVote: number, _id: string) {
        this._socket.emit('vote-photo', {
            _id,
            newVote
        });
    }
    
    // comment
    public comment (id: string, text: string) {
        this._socket.emit('comment-photo', {
            id,
            text
        });
    }
    
    // uncomment
    public deleteComment (id: string, date: string) {
        this._socket.emit('uncomment-photo', {
            id,
            date
        });
    }
        
    // start listen
    private _listen () {
        // photo deleted
        // this._socket.on('remove-photo', (data) => {
        //     this._serverActions.deletePhoto(data._id);
        // });
        // // new photo uploaded
        // this._socket.on('upload-photo', (data) => {
        //     this._serverActions.uploadPhoto(data);
        // });
        // // photo edited
        // this._socket.on('edit-photo', (dataChange: IDataChange) => {
        //     this._serverActions.editPhoto(dataChange);
        // });
        // // new vote accepted
        // this._socket.on('vote-photo', (data) => {
        //    this._serverActions.votePhoto(data); 
        // });
        // // all photos
        // this._socket.on(`photo-list`, (data) => {
        //     this._serverActions.downloadPhotos(data);
        // });
        // // new comment
        // this._socket.on(`comment-photo`, (data) => {
        //     this._serverActions.commentPhoto(data);
        // });
        // // delete comment
        // this._socket.on(`uncomment-photo`, (data) => {
        //     this._serverActions.deleteComment(data);
        // });
    }
    // stop listen
    private _stopListen () {
        // walk around this issues
        // this._socket._callbacks['$remove-photo'] = [];
        // this._socket._callbacks['$upload-photo'] = [];
        // this._socket._callbacks['$edit-photo'] = [];
        // this._socket._callbacks['$vote-photo'] = [];
        // this._socket._callbacks['$photo-list'] = [];
        // this._socket._callbacks['$comment-photo'] = [];
        // this._socket._callbacks['$uncomment-photo'] = [];
    }
}

export const SocketService = new SocketServiceClass(io, actionCreators);