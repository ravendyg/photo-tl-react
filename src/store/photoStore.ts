import { observable } from 'mobx';
import {
    IComment,
    IPhoto,
    IUser,
    IRating,
    IPhotoPatch,
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

    patchPhoto: (patch: IPhotoPatch) => void;

    deletePhoto: (iid: string) => void;

    updateRating: (user: IUser, rating: IRating) => void;

    addComment: (comment: IComment) => void;

    deleteComment: (iid: string) => void;
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

    patchPhoto(patch: IPhotoPatch) {
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            if (patch.iid === photo.iid) {
                this.photos[i] = {
                    ...photo,
                    ...patch
                };
                break;
            }
        }
    }

    deletePhoto(iid: string) {
        let position = -1;
        this.photos.forEach((item, index) => {
            if (item.iid === iid) {
                position = index;
            }
        });
        if (position > -1) {
            this.photos.splice(position, 1);
        }
    }

    updateRating(user: IUser, rating: IRating) {
        const {
            averageRating,
            iid,
            value,
        } = rating;
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            if (photo.iid === iid) {
                let newPhoto: IPhoto = {
                    ...photo,
                    averageRating,
                };
                if (user.uid === rating.uid) {
                    newPhoto.userRating = value;
                };
                this.photos[i] = newPhoto;
                break;
            }
        }
    }

    addComment(comment: IComment) {
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            if (photo.iid === comment.iid) {
                const newPhoto = {
                    ...photo,
                    commentCount: photo.commentCount + 1,
                }
                this.photos[i] = newPhoto;
                break;
            }
        }
    }

    deleteComment(iid: string) {
        for (let i = 0; i < this.photos.length; i++) {
            const photo = this.photos[i];
            if (photo.iid === iid) {
                if (photo.commentCount > 0) {
                    const commentCount = photo.commentCount - 1;
                    const newPhoto = {
                        ...photo,
                        commentCount,
                    }
                    this.photos[i] = newPhoto;
                }
                break;
            }
        }
    }
}
