import {observable} from 'mobx';
import {IUser} from '../types';
import {TStatus} from './loadingStatus';
import {IUserService} from '../services/UserService';

export interface IUserState {
    error: any;
    user: IUser | null;
    status: TStatus;
    load: () => void;
}

export class UserStore implements IUserState {
    @observable error: any = null;
    @observable user: IUser | null = null;
    @observable status: TStatus = 'idle';

    constructor(private userService: IUserService) {}

    load() {
        const self = this;
        self.status = 'loading';
        self.userService.getUser()
            .then(user => {
                self.user = user;
            })
            .catch(err => {
                self.error = err.message || 'Smth went wrong';
            })
            .then(() => {
                self.status = 'idle';
            });
    }
}
