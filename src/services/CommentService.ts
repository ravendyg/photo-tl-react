import {
    IHttp,
    IHttpInfo,
} from './Http';
import {
    IResponseContainer,
    IComment,
    IConfig,
} from '../types';
import { IAuthService } from './AuthService';

export interface ICommentService {
    addComment: (iid: string, text: string) => Promise<void>;

    getComments: (iid: string) => Promise<IResponseContainer<IComment[] | null>>;

    deleteComment: (cid: string) => Promise<void>;
}

export class CommentService implements ICommentService {
    constructor (
        private request: IHttp,
        private config: IConfig,
        private authService: IAuthService,
    ) { }

    addComment = (iid: string, text: string): Promise<void> => {
        const info: IHttpInfo = {
            body: {
                iid,
                text,
            },
        };
        return this.authService.callWithAuth(
            this.request.post,
            `${this.config.apiUrl}/comment`,
            info,
        )
        .then(() => {});
    };

    getComments = (iid: string) =>
        this.authService.callWithAuth(
            this.request.get,
            `${this.config.apiUrl}/comment/${iid}`,
        );

    deleteComment = (cid: string) =>
        this.authService.callWithAuth(
            this.request.delete,
            `${this.config.apiUrl}/comment/${cid}`,
        )
        .then(() => {});
}
