import {IHttp} from './http';
import {
    IResponseContainer,
    IPhoto,
    IConfig,
} from '../types';

export interface IPhotoService {
    getPhotoList: () => Promise<IResponseContainer<IPhoto[] | null>>;
}

export class PhotoService implements IPhotoService {
    constructor(private request: IHttp, private config: IConfig) {}

    getPhotoList = () =>
        this.request.get<IPhoto[]>(`${this.config.apiUrl}/photo`)
}
