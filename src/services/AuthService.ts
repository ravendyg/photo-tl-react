import { IHttpInfo } from './Http';
import {
    IResponseContainer,
    IUser,
} from '../types';
import { IUserStore } from '../store/userStore';

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

    constructor(private storage: Storage, private userStore: IUserStore) {
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
        return request(url, info)
        .then((resp: IResponseContainer<any>) => {
            if (resp && resp.status === 403) {
                this.updateToken(null);
                this.userStore.setUser(null);
            }
            return resp;
        });
    };

    updateToken = (token: string | null) => {
        this.token = token;
        if (token) {
            this.storage.setItem('token', token);
        } else {
            this.storage.removeItem('token');
        }
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
