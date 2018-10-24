import {ISignArgs, IUser, IResponseContainer} from '../types';
import {IUserStore} from '../store/userStore';
import {IUserService} from '../services/UserService';
import {ICommonStore} from '../store/commonStore';

export interface IUserActions {
    load: () => Promise<void>;
    signIn: (args: ISignArgs) => Promise<void>;
    signUp: (args: ISignArgs) => Promise<void>;
    signOut: () => Promise<void>;
}

export class UserActions implements IUserActions {
    constructor(
        private userService: IUserService,
        private userStore: IUserStore,
        private commonStore: ICommonStore,
    ) {}

    load = () => {
        this.userStore.startLoading();
        return this.userService.getUser()
            .then(userContainer => {
                if (userContainer.status === 200) {
                    this.userStore.setUser(userContainer.payload);
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
        action: (args: ISignArgs) => Promise<IResponseContainer<IUser>>,
        args: ISignArgs
    ) {
        this.userStore.startLoading();
        return action(args)
            .then(userContainer => {
                if (userContainer.status === 200) {
                    this.userStore.setUser(userContainer.payload);
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
