import {
    ISignArgs,
    IUser,
    IResponseContainer,
} from '../types';
import { IUserStore } from '../store/userStore';
import { IUserService } from '../services/UserService';
import { ICommonStore } from '../store/commonStore';
import { IConnectionActions } from './ConnectionActions';
import { IAuthService } from '../services/AuthService';

export interface IUserActions {
    init: () => void;
    signIn: (args: ISignArgs) => Promise<void>;
    signUp: (args: ISignArgs) => Promise<void>;
    signOut: () => Promise<void>;
}

export class UserActions implements IUserActions {
    constructor (
        private commonStore: ICommonStore,
        private connectionActions: IConnectionActions,
        private userService: IUserService,
        private userStore: IUserStore,
        private authService: IAuthService,
    ) { }

    init = () => {
        const maybeUser = this.userService.getUser();
        if (maybeUser) {
            this.userStore.setUser(maybeUser);
            this.authService.connectWithAuth(this.connectionActions.connect);
        }
    }

    signIn = (args: ISignArgs) => {
        return this.sign(this.userService.signIn, args);
    }

    signUp = (args: ISignArgs) => {
        return this.sign(this.userService.signUp, args);
    }

    signOut = () => {
        this.userStore.startLoading()
        this.connectionActions.disconnect();
        this.userStore.setUser(null);
        this.authService.dropAuth();
        return this.userService.signOut()
            .catch(err => {
                this.commonStore.setError(err.message);
            })
            .then(() => {
                this.userStore.endLoading();
            });
    }


    private sign(
        action: (args: ISignArgs) => Promise<IResponseContainer<IUser | null>>,
        args: ISignArgs
    ) {
        this.userStore.startLoading();
        return action(args)
            .then(userContainer => {
                if (userContainer.status === 200) {
                    const user = userContainer.payload;
                    if (user) {
                        this.userStore.setUser(user);
                        this.authService.connectWithAuth(this.connectionActions.connect);
                    } else {
                        throw new Error('User is null');
                    }
                } else {
                    this.userStore.setError(userContainer.error);
                }
            })
            .catch(err => {
                this.commonStore.setError(err.message);
            })
            .then(() => {
                this.userStore.endLoading();
            });
    }
}
