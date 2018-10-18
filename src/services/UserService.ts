import {IUser, IResponseContainer} from '../types';
import {IHttp} from './http';
import {IConfig} from '../types';

export interface IUserService {
    getUser: () => Promise<IUser>;
}

export class UserService implements IUserService {
    constructor(
        private request: IHttp,
        private config: IConfig,
    ) {}

    getUser: () => Promise<IUser> =
        () => this.request.get(`${this.config.apiUrl}/user`)
}
