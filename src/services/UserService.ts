import { IHttp } from './Http';
import {
    IConfig,
    IResponseContainer,
    ISignArgs,
    IUser,
} from '../types';
import { IAuthService } from './AuthService';

export interface IUserService {
    getUser: () => IUser | null;

    signIn: (args: ISignArgs) => Promise<IResponseContainer<IUser | null>>;

    signUp: (args: ISignArgs) => Promise<IResponseContainer<IUser | null>>;

    signOut: () => Promise<IResponseContainer<null>>;
}

export class UserService implements IUserService {
    constructor(
        private authService: IAuthService,
        private request: IHttp,
        private config: IConfig,
    ) {}

    getUser = () =>
        this.authService.getUser();

    signIn = (signArgs: ISignArgs) =>
        this.request.get(`${this.config.apiUrl}/user`, {
            headers:{
                login: signArgs.login,
                pas: signArgs.pas,
            }
        })
        .then(this.handlePostSIgn);

    signUp = (body: ISignArgs) =>
        this.request.post(`${this.config.apiUrl}/user`, {body})
        .then(this.handlePostSIgn);

    signOut = () =>
        // a placeholder if token deletion will be implemented
        Promise.resolve() as Promise<any>;

    private handlePostSIgn = (resp: IResponseContainer<string | null>) => {
            const token = resp.payload;
            if (resp.status === 200 && token) {
                this.authService.updateToken(token)
                return {
                    ...resp,
                    payload: this.authService.getUser(),
                };
            } else {
                return {
                    ...resp,
                    payload: null,
                }
            }
        };
}
