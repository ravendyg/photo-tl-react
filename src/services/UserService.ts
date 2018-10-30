import {IUser, IResponseContainer} from '../types';
import {IHttp} from './Http';
import {IConfig, ISignArgs} from '../types';

export interface IUserService {
    getUser: () => Promise<IResponseContainer<IUser | null>>;

    signIn: (args: ISignArgs) => Promise<IResponseContainer<IUser | null>>;

    signUp: (args: ISignArgs) => Promise<IResponseContainer<IUser | null>>;

    signOut: () => Promise<IResponseContainer<null>>;
}

export class UserService implements IUserService {
    constructor(
        private request: IHttp,
        private config: IConfig,
    ) {}

    getUser = () =>
        this.request.get<IUser>(`${this.config.apiUrl}/user`)

    signIn = (body: ISignArgs) =>
        this.request.post<IUser>(`${this.config.apiUrl}/session`, {body})

    signUp = (body: ISignArgs) =>
        this.request.post<IUser>(`${this.config.apiUrl}/user`, {body})

    signOut = () =>
        this.request.delete(`${this.config.apiUrl}/session`)
}
