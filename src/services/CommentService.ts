import {
    IHttp,
    IHttpInfo,
} from './Http';
import {
    IResponseContainer,
    IComment,
    IConfig,
} from '../types';

export interface ICommentService {
    getComments: () => Promise<IResponseContainer<IComment[] | null>>;
}

export class CommentService implements ICommentService {
    constructor (private request: IHttp, private config: IConfig) { }

    getComments = () =>
        this.request.get<IComment[]>(`${this.config.apiUrl}/comment`)
}
