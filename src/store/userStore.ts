import {observable} from 'mobx';
import {ISignArgs, IUser, IResponseContainer} from '../types';
import {TStatus} from './loadingStatus';
import {IUserService} from '../services/UserService';
import {ICommonState} from './commonStore';

export interface IUserState {
    error: any;
    user: IUser | null;
    loading: boolean;
    load: () => void;
    signIn: (args: ISignArgs) => void;
    signUp: (args: ISignArgs) => void;
}

export class UserStore implements IUserState {
    @observable error: any = null;
    @observable user: IUser | null = null;
    @observable loading: boolean = false;

    constructor(
        private userService: IUserService,
        private commonState: ICommonState,
    ) {}

    load() {
        const self = this;
        self.loading = true;
        self.error = '';
        self.userService.getUser()
            .then(userContainer => {
                if (userContainer.status === 200) {
                    self.user = userContainer.payload;
                }
                // don't handle errors
            })
            .catch(err => {
                const error = err.message || 'Smth went wrong';
                this.commonState.setError(error);
            })
            .then(() => {
                self.loading = false;
            });
    }

    private sign(
        action: (args: ISignArgs) => Promise<IResponseContainer<IUser>>,
        args: ISignArgs
    ) {
        const self = this;
        self.loading = true;
        self.error = '';
        action(args)
            .then(userContainer => {
                if (userContainer.status === 200) {
                    self.user = userContainer.payload;
                } else {
                    self.error = userContainer.error
                }
            })
            .catch(err => {
                const error = err.message || 'Smth went wrong';
                this.commonState.setError(error);
            })
            .then(() => {
                self.loading = false;
            });
    }

    signIn(args: ISignArgs) {
        this.sign(this.userService.signIn, args);
    }

    signUp(args: ISignArgs) {
        this.sign(this.userService.signUp, args);
    }

}
