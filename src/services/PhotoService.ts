import {
    IHttp,
    IHttpInfo,
    IHttpHeaders,
} from './Http';
import {
    IResponseContainer,
    IPhoto,
    IConfig,
} from '../types';
import { IAuthService } from './AuthService';

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

    registerView: (iid: string) => Promise<IResponseContainer<null>>;
}

export class PhotoService implements IPhotoService {
    constructor (
        private request: IHttp,
        private config: IConfig,
        private authService: IAuthService,
    ) { }

    getPhotoList = () =>
        this.authService.callWithAuth(
            this.request.get,
            `${this.config.apiUrl}/photo`
        );

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
        return this.authService.callWithAuth(
            this.request.post,
            `${this.config.apiUrl}/photo`,
            info,
        );
    }

    registerView = (iid: string) => {
        const info: IHttpInfo = {
            body: { iid },
        };
        return this.authService.callWithAuth(
            this.request.post,
            `${this.config.apiUrl}/view`,
            info,
        );
    }
}
