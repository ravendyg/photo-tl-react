import {
    IHttp,
    IHttpInfo,
} from './Http';
import {
    IResponseContainer,
    IPhoto,
    IConfig,
    IRating,
} from '../types';

export interface IUploadFile {
    body: string;
    title: string;
    description: string;
    type: string;
}

export interface IPhotoService {
    getPhotoList: () => Promise<IResponseContainer<IPhoto[] | null>>;

    uploadPhoto: (data: IUploadFile) => Promise<IResponseContainer<null>>;

    chageRating: (iid: string, rating: number) => void;
}

export class PhotoService implements IPhotoService {
    constructor (private request: IHttp, private config: IConfig) { }

    getPhotoList = () =>
        this.request.get<IPhoto[]>(`${this.config.apiUrl}/photo`)

    uploadPhoto = (data: IUploadFile) => {
        const {
            body,
            description,
            title,
            type,
        } = data;
        const info: IHttpInfo = {
            headers: {
                description,
                title,
                type,
            },
            body,
        };
        return this.request.post<null>(`${this.config.apiUrl}/photo`, info);
    }

    chageRating = (iid: string, rating: number) => {
        const info: IHttpInfo = {
            body: {
                iid,
                rating,
            },
        };
        return this.request.post<null>(`${this.config.apiUrl}/photo/rating`, info);
    }
}
