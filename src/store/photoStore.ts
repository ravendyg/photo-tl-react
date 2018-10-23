import {observable} from 'mobx';
import {IWebSocketService} from '../services/WebSocketService';
import {
    IPhoto,
    IUser,
} from '../types';
import {IPhotoService} from '../services/PhotoService';

export interface IPhotoStore {
    status: string;
    statusMessage: string;
    photos: IPhoto[];

    connect: (user: IUser) => void;

    loadPhotos: () => void;
}

export class PhotoStore implements IPhotoStore {
    @observable status = 'disconnected';
    @observable statusMessage = 'Disconnected';
    @observable photoStatus = 'idle';
    @observable photoError = '';
    @observable photos: IPhoto[] = [];

    constructor(
        private webSocketService: IWebSocketService,
        private photoService: IPhotoService,
    ) { }

    connect(user: IUser) {
        this.status = 'connecting';
        this.statusMessage = 'Connecting...';
        const self = this;
        this.webSocketService.subscribe<{message: string}>('error', err => {
            console.log(err.message);
            self.status = 'error';
            self.statusMessage = err.message;
        });
        this.webSocketService.subscribe('connect', () => {
            self.status = 'connected';
            self.statusMessage = 'Connected';
        });
        this.webSocketService.subscribe<any>('message', (message) => {
            console.log(message);
        });
        this.webSocketService.connect();
    }

    loadPhotos() {
        const self = this;
        self.photoStatus = 'loading';
        self.photoService.getPhotoList()
            .then(photosWrapper => {
                if (photosWrapper.status === 200) {
                    self.photos = photosWrapper.payload;
                } else {
                    self.photoError = photosWrapper.error;
                }
            })
            .catch(err => {

            })
            .then(() => {
                self.photoStatus = 'idle';
            });
    }
}
