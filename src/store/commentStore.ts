import { observable } from 'mobx';
import { IComment } from '../types';

export interface ICommentStore {
    commentsDisplayedFor: string | null;

    error: string;
    comments: IComment[] | null;

    displayComments: (iid?: string) => void;
    setComments: (iid: string, data: IComment[]) => void;
    setError: (error: string) => void;
}

export class CommentStore implements ICommentStore {
    @observable commentsDisplayedFor: string | null = null;

    @observable error = '';
    @observable comments: IComment[] | null = null;

    setComments(iid: string, data: IComment[]) {
        if (this.commentsDisplayedFor === iid) {
            this.comments = data;
        }
    }

    setError(error: string) {
        this.error = error;
    }

    displayComments(iid: string | null = null) {
        this.commentsDisplayedFor = iid;
        this.error = '';
        this.comments = null;
    }
}
