import { IPhotoService, IUploadFile } from '../services/PhotoService';
import { IPhotoStore } from '../store/photoStore';
import { ICommonStore } from '../store/commonStore';
import { IPhoto } from '../types';
import { IConnectionActions, EWSAction } from './ConnectionActions';
import { ICommentStore } from '../store/commentStore';

export interface IPhotoActions {
    showComments: (iid: string) => void;

    loadPhotos: () => void;
}

export class CommentActions implements IPhotoActions {
    constructor (
        private commentStore: ICommentStore,
    ) {
    }

    showComments = (iid: string | null) => {
        this.commentStore.displayComments(iid);
    }

    loadPhotos = () => {
        // this.photoStore.startLoading();
        // this.photoService.getPhotoList()
        //     .then(photosWrapper => {
        //         if (photosWrapper.status === 200) {
        //             this.photoStore.setPhotos(photosWrapper.payload || []);
        //         } else {
        //             this.photoStore.setError(photosWrapper.error);
        //         }
        //     })
        //     .catch(err => {
        //         this.photoStore.stopLoading();
        //         this.commonStore.setError(err);
        //     });
    }

}
