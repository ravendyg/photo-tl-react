import { ICommentStore } from '../store/commentStore';
import { ICommentService } from '../services/CommentService';
import { ICommonStore } from '../store/commonStore';
import { IConnectionActions, EWSAction } from './ConnectionActions';
import {
    IComment,
    IResponseContainer,
    IDeletedComment,
} from '../types';
import { IPhotoStore } from '../store/photoStore';

export interface ICommentActions {
    showComments: (iid: string) => void;

    hideComments: () => void;

    addComment: (iid: string, text: string) => void;

    getComments: (iid: string) => void;

    deleteComment: (cid: string) => void;
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
        this.connectionAction.subscribe(EWSAction.DELETE_COMMENT, this.onDeleteComment);
    }

    showComments = (iid: string) => {
        this.commentStore.displayComments(iid);
        this.commonStore.setModal('comments');
    }

    hideComments = () => {
        this.commentStore.displayComments();
        this.commonStore.setModal();
    }

    addComment = (iid: string, text: string) => {
        const payload = { iid, text, };
        this.connectionAction.send(EWSAction.NEW_COMMENT, payload);
    }

    getComments = (iid: string) => {
        this.commentService.getComments(iid)
        .then((commentsContainer: IResponseContainer<IComment[] | null>) => {
            const { payload, status, } = commentsContainer;
            if (status === 200) {
                this.commentStore.setComments(iid, payload ? payload : []);
            }
        });
    };

    deleteComment = (cid: string) => {
        const payload = { cid, };
        this.connectionAction.send(EWSAction.DELETE_COMMENT, payload);
    }

    private onNewComment = (comment: IComment) => {
        this.commentStore.addComment(comment);
        this.photoStore.addComment(comment);
    };

    private onDeleteComment = ({cid, iid}: IDeletedComment) => {
        this.commentStore.deleteComment(cid);
        this.photoStore.deleteComment(iid);
    };
}
