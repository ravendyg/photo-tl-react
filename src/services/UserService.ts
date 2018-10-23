import {IUser, IResponseContainer} from '../types';
import {IHttp} from './Http';
import {IConfig, ISignArgs} from '../types';

export interface IUserService {
    getUser: () => Promise<IResponseContainer<IUser>>;

    signIn: (ISignArgs) => Promise<IResponseContainer<IUser>>;

    signUp: (ISignArgs) => Promise<IResponseContainer<IUser>>;

    signOut: () => Promise<IResponseContainer<void>>;
}

export class UserService implements IUserService {
    constructor(
        private request: IHttp,
        private config: IConfig,
    ) {}

    getUser = () =>
        this.request.get<IUser>(`${this.config.apiUrl}/user`)

    signIn = (body: ISignArgs) =>
        this.request.post<IUser>(`${this.config.apiUrl}/session`, body)

    signUp = (body: ISignArgs) =>
        this.request.post<IUser>(`${this.config.apiUrl}/user`, body)

    signOut = () =>
        this.request.delete(`${this.config.apiUrl}/session`)
}
