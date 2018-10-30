import { observable } from 'mobx';
import { IPhoto } from '../types';
import { IPhotoService } from '../services/PhotoService';

export interface IPhotoStore {
    status: string;
    error: string;
    photos: IPhoto[];
    editedPhoto: IPhoto | null;

    startLoading: () => void;
    setPhotos: (data: IPhoto[]) => void;
    setError: (error: string) => void;
    stopLoading: () => void;
    setEdited: (editedPhoto: IPhoto | null) => void;
    addPhoto: (photo: IPhoto) => void;
}

export class PhotoStore implements IPhotoStore {
    @observable status = 'idle';
    @observable error = '';
    @observable photos: IPhoto[] = [];
    @observable editedPhoto: IPhoto | null = null;

    constructor (
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

    setEdited(editedPhoto: IPhoto | null) {
        this.editedPhoto = editedPhoto;
    }

    addPhoto(photo: IPhoto) {
        this.photos.unshift(photo);
    }
}
