import { observable } from 'mobx';
import {
    IPhoto,
    IUser,
    IRating,
} from '../types';
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
    updateRating: (user: IUser, rating: IRating) => void;
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

    updateRating(user: IUser, rating: IRating) {
        const {
            averageRating,
            count,
            iid,
            value,
            uid,
        } = rating;
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            if (photo.iid === iid) {
                let newPhoto: IPhoto = {
                    ...photo,
                    userRating: value,
                    averageRating,
                    commentCount: count,
                };
                this.photos[i] = newPhoto;
                break;
            }
        }
    }
}
