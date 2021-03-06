import { observable } from 'mobx';
import { IComment } from '../types';

export interface ICommentStore {
    commentsDisplayedFor: string | null;

    error: string;
    comments: IComment[];

    displayComments: (iid?: string) => void;

    setComments: (iid: string, data: IComment[]) => void;

    setError: (error: string) => void;

    addComment: (comment: IComment) => void;

    deleteComment: (cid: string) => void;
}

export class CommentStore implements ICommentStore {
    @observable commentsDisplayedFor: string | null = null;

    @observable error = '';
    @observable comments: IComment[] = [];

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
        this.comments = [];
    }

    addComment(comment: IComment) {
        if (this.commentsDisplayedFor === comment.iid) {
            this.comments.unshift(comment);
        }
    }

    deleteComment(cid: string) {
        let position = -1;
        this.comments.forEach((item, index) => {
            if (item.cid === cid) {
                position = index;
            }
        });
        if (position > -1) {
            this.comments.splice(position, 1);
        }
    }
}
