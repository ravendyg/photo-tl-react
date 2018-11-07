import { IHttpInfo } from './Http';
import {
    IResponseContainer,
    IUser,
} from '../types';

export interface IAuthService {
    isAuthorized: () => boolean;

    dropAuth: () => void;

    callWithAuth(
        request: (url: string, info?: IHttpInfo) => Promise<IResponseContainer<any>>,
        url: string,
        info?: IHttpInfo,
    ): Promise<IResponseContainer<any>>;

    updateToken: (token: string) => void;

    getUser: () => IUser | null;
}

export class AuthService implements IAuthService {
    private token: string | null = null;

    constructor(private storage: Storage) {
        this.token = this.storage.getItem('token');
    }

    isAuthorized = () => Boolean(this.token);

    dropAuth = () => {
        this.token = null;
    };

    callWithAuth = (
        request: (url: string, info?: IHttpInfo) => Promise<IResponseContainer<any>>,
        url: string,
        info: IHttpInfo = {},
    ) => {
        if (this.token) {
            if (!info.headers) {
                info.headers = {};
            }
            info.headers.token = this.token;
        }
        return request(url, info);
    };

    updateToken = (token: string) => {
        this.token = token;
        this.storage.setItem('token', token);
    }

    getUser = () => {
        if (!this.token) {
            return null;
        }
        try {
            const [_, payload] = this.token.split('.');
            const userStr = atob(payload);
            return JSON.parse(userStr);
        } catch(err) {
            console.error(err);
            return null;
        }
    }
}
