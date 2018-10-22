import {observable} from 'mobx';
import {IWebSocketService} from '../services/WebSocketService';
import {IUser} from '../types';

export interface IPhotoStore {
    state: string;
    photos: any[];

    connect: (user: IUser) => void;
}

export class PhotoStore implements IPhotoStore {
    @observable state = 'idle';
    @observable photos: any[] = [];

    constructor(private webSocketService: IWebSocketService) { }

    connect(user: IUser) {
        console.log(user);
        this.state = 'connecting';
        this.webSocketService.connect();
        const self = this;
        this.webSocketService.subscribe<{message: string}>(-1, err => {
            console.log(err.message);
            self.state = 'error';
        });
    }
}
