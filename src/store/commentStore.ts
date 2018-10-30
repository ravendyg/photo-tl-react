import { observable } from 'mobx';
import { IPhoto, IComment } from '../types';
import { ICommentService } from '../services/CommentService';

export interface ICommentStore {
    commentsDisplayedFor: string | null;

    status: string;
    error: string;
    comments: IComment[];

    displayComments: (iid: string | null) => void;
    startLoading: () => void;
    setComments: (iid: string, data: IComment[]) => void;
    setError: (error: string) => void;
    stopLoading: () => void;
}

export class CommentStore implements ICommentStore {
    @observable commentsDisplayedFor: string | null = null;

    @observable status = 'idle';
    @observable error = '';
    @observable comments: IComment[] = [];

    constructor (
        private commentService: ICommentService,
    ) { }

    startLoading() {
        this.status = 'loading';
        this.error = '';
    }

    setComments(iid: string, data: IComment[]) {
        if (this.commentsDisplayedFor === iid) {
            this.status = 'idle';
            this.comments = data;
        }
    }

    setError(error: string) {
        this.status = 'idle';
        this.error = error;
    }

    stopLoading() {
        this.status = 'idle';
    }

    displayComments(iid: string | null) {
        this.commentsDisplayedFor = iid;
    }
}
