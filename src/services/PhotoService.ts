import {
    IHttp,
    IHttpInfo,
} from './Http';
import {
    IResponseContainer,
    IPhoto,
    IConfig,
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
}
