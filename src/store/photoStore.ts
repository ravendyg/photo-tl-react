import {observable} from 'mobx';
import {IWebSocketService} from '../services/WebSocketService';
import {
    IPhoto,
    IUser,
} from '../types';
import {IPhotoService} from '../services/PhotoService';

export interface IPhotoStore {
    photos: IPhoto[];

    startLoading: () => void;
    setPhotos: (data: IPhoto[]) => void;
    setError: (error: string) => void;
    stopLoading: () => void;
}

export class PhotoStore implements IPhotoStore {
    @observable status = 'idle';
    @observable error = '';
    @observable photos: IPhoto[] = [];

    constructor(
        private photoService: IPhotoService,
    ) { }

    startLoading() {
        this.status = 'loading';
        this.error = '';
    }

    setPhotos(data: IPhoto[]) {
        this.status = 'idle';
        this.photos = data;
    }

    setError(error: string) {
        this.status = 'idle';
        this.error = error;
    }

    stopLoading() {
        this.status = 'idle';
    }
}
