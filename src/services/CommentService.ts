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
    addComment: (iid: string, text: string) => Promise<void>;

    getComments: (iid: string) => Promise<IResponseContainer<IComment[] | null>>;
}

export class CommentService implements ICommentService {
    constructor (private request: IHttp, private config: IConfig) { }

    addComment = (iid: string, text: string): Promise<void> => {
        const info: IHttpInfo = {
            body: {
                iid,
                text,
            },
        };
        return this.request.post<void>(`${this.config.apiUrl}/comment`, info)
        .then(() => {});
    };

    getComments = (iid: string) =>
        this.request.get<IComment[]>(`${this.config.apiUrl}/comment/${iid}`);
}
