import { ICommentStore } from '../store/commentStore';
import { ICommentService } from '../services/CommentService';
import { ICommonStore } from '../store/commonStore';
import { IConnectionActions, EWSAction } from './ConnectionActions';
import {
    IComment,
    IResponseContainer,
} from '../types';
import { IPhotoStore } from '../store/photoStore';

export interface ICommentActions {
    showComments: (iid: string) => void;

    hideComments: () => void;

    addComment: (iid: string, text: string) => Promise<void>;

    getComments: (iid: string) => void;
}

export class CommentActions implements ICommentActions {
    constructor (
        private commentStore: ICommentStore,
        private commonStore: ICommonStore,
        private commentService: ICommentService,
        private connectionAction: IConnectionActions,
        private photoStore: IPhotoStore,
    ) {
        this.connectionAction.subscribe(EWSAction.NEW_COMMENT, this.onNewComment);
    }

    showComments = (iid: string) => {
        this.commentStore.displayComments(iid);
        this.commonStore.setModal('comments');
    }

    hideComments = () => {
        this.commentStore.displayComments();
        this.commonStore.setModal();
    }

    addComment = this.commentService.addComment;

    getComments = (iid: string) => {
        this.commentService.getComments(iid)
        .then((commentsContainer: IResponseContainer<IComment[] | null>) => {
            const { payload, status, } = commentsContainer;
            if (status === 200) {
                this.commentStore.setComments(iid, payload ? payload : []);
            }
        });
    }

    private onNewComment = (comment: IComment) => {
        this.commentStore.addComment(comment);
        this.photoStore.addComment(comment);
    }
}
