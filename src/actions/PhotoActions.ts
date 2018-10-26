import {IPhotoService, IUploadFile} from '../services/PhotoService';
import {IPhotoStore} from '../store/photoStore';
import {ICommonStore} from '../store/commonStore';
import {IPhoto} from '../types';

export interface IPhotoActions {
    loadPhotos: () => void;

    editPhoto: (photo: IPhoto | null) => void;

    stopEditPhoto: () => void;

    uploadPhoto: (title: string, description: string, file: File) => Promise<void>;
}

export class PhotoActions implements IPhotoActions {
    constructor(
        private commonStore: ICommonStore,
        private photoStore: IPhotoStore,
        private photoService: IPhotoService,
    ) {}

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
            reader.onload = ({target} : any) => {
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
}
