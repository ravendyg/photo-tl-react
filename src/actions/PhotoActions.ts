import { IPhotoService, IUploadFile } from '../services/PhotoService';
import { IPhotoStore } from '../store/photoStore';
import { ICommonStore } from '../store/commonStore';
import {
    IPhoto,
    IRating,
    IResponseContainer,
    IPhotoPatch,
    IPhotoPatchRequest,
    IViewReport,
} from '../types';
import { IConnectionActions, EWSAction } from './ConnectionActions';
import { IUserStore } from '../store/userStore';

export interface IPhotoActions {
    loadPhotos: () => void;

    editPhoto: (photo: IPhoto | null) => void;

    stopEditPhoto: () => void;

    uploadPhoto: (title: string, description: string, file: File) => Promise<void>;

    patchPhoto: (title: string, description: string, iid: string) => void;

    deletePhoto: (iid: string) => void;

    changeRating: (iid: string, rating: number) => void;

    registerView: (iid: string) => void;
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
        this.connectionAction.subscribe(EWSAction.PATCH_PHOTO, this.onPatchPhoto);
        this.connectionAction.subscribe(EWSAction.DELETE_PHOTO, this.onDeletePhoto);
        this.connectionAction.subscribe(EWSAction.ADD_VIEW, this.onViewPhoto);
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
        this.commonStore.setModal();
    }

    uploadPhoto = (title: string, description: string, file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            // can upload without reading into memory?
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
                    return resolve(
                        this.photoService.uploadPhoto(data)
                        .then(this.handleActionNullResult)
                        .catch(reject)
                    );
                } else {
                    return reject({ message: 'Could not upload the file' });
                }
            }
            reader.readAsArrayBuffer(file);
        });
    }

    patchPhoto = (title: string, description: string, iid: string) => {
        const payload: IPhotoPatchRequest = {
            description,
            iid,
            title,
        };
        this.connectionAction.send(EWSAction.PATCH_PHOTO, payload);
    };

    deletePhoto = (iid: string) => {
        const payload = { iid, };
        this.connectionAction.send(EWSAction.DELETE_PHOTO, payload);
    }

    changeRating = (iid: string, rating: number) => {
        const payload = {
            iid,
            rating,
        };
        this.connectionAction.send(EWSAction.RATING_UPDATE, payload);
    }

    registerView = (iid: string) => {
        const { photos } = this.photoStore;
        const { user } = this.userStore;

        for (let photo of photos) {
            if (photo.iid === iid
                && user && user.uid !== photo.uploadedBy.uid
            ) {
                const payload = {
                    iid,
                };
                this.connectionAction.send(EWSAction.ADD_VIEW, payload);
                break;
            }
        }
    };

    private handleActionNullResult = (result: IResponseContainer<null>) => {
        if (result.status === 200) {
            this.stopEditPhoto();
            this.commonStore.setModal();
        } else {
            throw { message: result.error };
        }
    };

    private onNewPhoto = (photo: IPhoto) => {
        this.photoStore.addPhoto(photo);
    };

    private onRatingUpdate = (rating: IRating) => {
        const { user } = this.userStore;
        if (user) {
            this.photoStore.updateRating(user, rating);
        }
    };

    private onPatchPhoto = (photo: IPhotoPatch) => {
        this.photoStore.patchPhoto(photo);
    };

    private onDeletePhoto = (iid: string) => {
        this.photoStore.deletePhoto(iid);
    };

    private onViewPhoto = (view: IViewReport) => {
        this.photoStore.viewPhoto(view.iid);
    };
}
