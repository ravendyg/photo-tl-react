import {IPhotoService} from '../services/PhotoService';
import {IPhotoStore} from '../store/photoStore';
import {ICommonStore} from '../store/commonStore';
import {IPhoto} from '../types';

export interface IPhotoActions {
    loadPhotos: () => void;

    editPhoto: (photo: IPhoto | null) => void;

    stopEditPhoto: () => void;
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
}
