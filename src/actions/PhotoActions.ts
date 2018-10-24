import {IPhotoService} from '../services/PhotoService';
import {IPhotoStore} from '../store/photoStore';
import {ICommonStore} from '../store/commonStore';
import {IConnectionActions} from './ConnectionActions';

export interface IPhotoActions {
    loadPhotos: () => void;

    displayAddPhotoModal: () => void;
}

export class PhotoActions implements IPhotoActions {
    constructor(
        private commonStore: ICommonStore,
        private connectionActions: IConnectionActions,
        private photoStore: IPhotoStore,
        private photoService: IPhotoService,
    ) {}

    loadPhotos = () => {
        this.photoStore.startLoading();
        this.photoService.getPhotoList()
            .then(photosWrapper => {
                if (photosWrapper.status === 200) {
                    this.photoStore.setPhotos(photosWrapper.payload);
                } else {
                    this.photoStore.setError(photosWrapper.error);
                }
            })
            .catch(err => {
                this.photoStore.stopLoading();
                this.commonStore.setError(err);
            });
    }

    displayAddPhotoModal = () => {
        this.commonStore.setModal('add');
    }
}
