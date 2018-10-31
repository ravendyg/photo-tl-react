import { IPhotoService, IUploadFile } from '../services/PhotoService';
import { IPhotoStore } from '../store/photoStore';
import { ICommonStore } from '../store/commonStore';
import { IPhoto, IRating } from '../types';
import { IConnectionActions, EWSAction } from './ConnectionActions';
import { IUserStore } from '../store/userStore';

export interface IPhotoActions {
    loadPhotos: () => void;

    editPhoto: (photo: IPhoto | null) => void;

    stopEditPhoto: () => void;

    uploadPhoto: (title: string, description: string, file: File) => Promise<void>;

    changeRating: (iid: string, rating: number) => void;
}

export class PhotoActions implements IPhotoActions {
    constructor (
        private connectionAction: IConnectionActions,
        private commonStore: ICommonStore,
        private photoStore: IPhotoStore,
        private photoService: IPhotoService,
        private userStore: IUserStore,
    ) {
        this.connectionAction.subscribe(EWSAction.NEW_PHOTO, this.onNewPhoto);
        this.connectionAction.subscribe(EWSAction.RATING_UPDATE, this.onRatingUpdate);
    }

    loadPhotos = () => {
        this.photoStore.startLoading();
        this.photoService.getPhotoList()
            .then(photosWrapper => {
                if (photosWrapper.status === 200) {
                    this.photoStore.setPhotos(photosWrapper.payload || []);
                } else {
                    this.photoStore.setError(photosWrapper.error);
                }
            })
            .catch(err => {
                this.photoStore.stopLoading();
                this.commonStore.setError(err);
            });
    }

    editPhoto = (photo: IPhoto | null) => {
        // TODO: move to common actions
        this.photoStore.setEdited(photo);
        this.commonStore.setModal('edit-photo');
    }

    stopEditPhoto = () => {
        this.photoStore.setEdited(null);
        this.commonStore.setModal(null);
    }

    uploadPhoto = (title: string, description: string, file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = ({ target }: any) => {
                if (target && target.result) {
                    const data: IUploadFile = {
                        body: target.result,
                        description,
                        title,
                        type: file.type,
                    };
                    this.photoService.uploadPhoto(data)
                        .then(result => {
                            if (result.status === 200) {
                                this.stopEditPhoto();
                                this.commonStore.setModal(null);
                                resolve();
                            } else {
                                return reject({ message: result.error });
                            }
                        })
                        .catch(reject)
                } else {
                    return reject({ message: 'Could not upload the file' });
                }
            }
            reader.readAsArrayBuffer(file);
        });
    }

    changeRating = this.photoService.chageRating;

    private onNewPhoto = (photo: IPhoto) => {
        this.photoStore.addPhoto(photo);
    }

    private onRatingUpdate = (rating: IRating) => {
        const { user } = this.userStore;
        if (user) {
            this.photoStore.updateRating(user, rating);
        }
    }
}
