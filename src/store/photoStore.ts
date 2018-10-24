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

    startLoading: () => void;
    setPhotos: (data: IPhoto[]) => void;
    setError: (error: string) => void;
    stopLoading: () => void;

    connect: (user: IUser) => void;
}

export class PhotoStore implements IPhotoStore {
    // TODO: Extract WS part into a separate store/service?
    @observable status = 'disconnected';
    @observable statusMessage = 'Disconnected';

    @observable photoStatus = 'idle';
    @observable photoError = '';
    @observable photos: IPhoto[] = [];

    constructor(
        private webSocketService: IWebSocketService,
        private photoService: IPhotoService,
    ) { }

    startLoading() {
        this.photoStatus = 'loading';
        this.photoError = '';
    }

    setPhotos(data: IPhoto[]) {
        this.photoStatus = 'idle';
        this.photos = data;
    }

    setError(error: string) {
        this.photoStatus = 'idle';
        this.photoError = error;
    }

    stopLoading() {
        this.photoStatus = 'idle';
    }

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
}
