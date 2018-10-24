import {ISignArgs, IUser, IResponseContainer} from '../types';
import {IUserStore} from '../store/userStore';
import {IUserService} from '../services/UserService';
import {ICommonStore} from '../store/commonStore';
import {IConnectionActions} from './ConnectionActions';

export interface IUserActions {
    load: () => Promise<void>;
    signIn: (args: ISignArgs) => Promise<void>;
    signUp: (args: ISignArgs) => Promise<void>;
    signOut: () => Promise<void>;
}

export class UserActions implements IUserActions {
    constructor(
        private commonStore: ICommonStore,
        private connectionActions: IConnectionActions,
        private userService: IUserService,
        private userStore: IUserStore,
    ) {}

    load = () => {
        this.userStore.startLoading();
        return this.userService.getUser()
            .then(userContainer => {
                if (userContainer.status === 200) {
                    const user = userContainer.payload;
                    if (user) {
                        this.connectionActions.connect(user)
                        this.userStore.setUser(user);
                    } else {
                        throw new Error('User is null');
                    }
                }
                // don't handle errors
            })
            .catch(err => {
                this.commonStore.setError(err.message);
            })
            .then(() => {
                this.userStore.endLoading();
            });
    }

    signIn = (args: ISignArgs) => {
        return this.sign(this.userService.signIn, args);
    }

    signUp = (args: ISignArgs) => {
        return this.sign(this.userService.signUp, args);
    }

    signOut = () => {
        this.userStore.startLoading()
        return this.userService.signOut()
            .then(() => {
                this.connectionActions.disconnect();
                this.userStore.setUser(null);
            })
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
                        this.connectionActions.connect(user)
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
