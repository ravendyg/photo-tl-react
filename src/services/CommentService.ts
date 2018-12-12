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
    getComments: (iid: string) => Promise<IResponseContainer<IComment[] | null>>;
}

export class CommentService implements ICommentService {
    constructor (
        private request: IHttp,
        private config: IConfig,
        private authService: IAuthService,
    ) { }

    getComments = (iid: string) =>
        this.authService.callWithAuth(
            this.request.get,
            `${this.config.apiUrl}/comment/${iid}`,
        );
}
