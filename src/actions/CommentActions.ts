import { ICommentStore } from '../store/commentStore';
import { ICommentService } from '../services/CommentService';
import { ICommonStore } from '../store/commonStore';

export interface ICommentActions {
    showComments: (iid: string) => void;

    hideComments: () => void;
}

export class CommentActions implements ICommentActions {
    constructor (
        private commentStore: ICommentStore,
        private commonStore: ICommonStore,
        private commentService: ICommentService,
    ) {
    }

    showComments = (iid: string) => {
        this.commentStore.displayComments(iid);
        this.commonStore.setModal('comments');
    }

    hideComments = () => {
        this.commentStore.displayComments();
        this.commonStore.setModal();
    }

    getComments = (iid: string) => {
        console.log(iid);
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
