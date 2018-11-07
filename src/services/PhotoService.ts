import {
    IHttp,
    IHttpInfo,
    IHttpHeaders,
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

export interface IPatchPhoto {
    iid: string;
    title: string;
    description: string;
}

export interface IPhotoService {
    getPhotoList: () => Promise<IResponseContainer<IPhoto[] | null>>;

    uploadPhoto: (data: IUploadFile) => Promise<IResponseContainer<null>>;

    patchPhoto: (data: IPatchPhoto) => Promise<IResponseContainer<null>>;

    deletePhoto: (iid: string) => Promise<IResponseContainer<null>>;

    chageRating: (iid: string, rating: number) => Promise<IResponseContainer<null>>;

    registerView: (iid: string) => Promise<IResponseContainer<null>>;
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

    patchPhoto = (data: IPatchPhoto) => {
        const info: IHttpInfo = {
            headers: data as any,
        };
        return this.request.patch<null>(`${this.config.apiUrl}/photo`, info);
    }

    deletePhoto = (iid: string) => {
        const info: IHttpHeaders = {
            headers: { iid },
        };
        return this.request.delete(`${this.config.apiUrl}/photo`, info);
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

    registerView = (iid: string) => {
        const info: IHttpInfo = {
            body: { iid },
        };
        return this.request.post<null>(`${this.config.apiUrl}/photo/view`, info);
    }
}
