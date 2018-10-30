import {observable} from 'mobx';
import {IUser} from '../types';

export interface IUserStore {
    error: string;
    user: IUser | null;
    loading: boolean;

    setError: (error: string) => void;
    setUser: (user: IUser | null) => void;
    startLoading: () => void;
    endLoading: () => void;
}

export class UserStore implements IUserStore {
    @observable error: any = null;
    @observable user: IUser | null = null;
    @observable loading: boolean = false;

    setError(error: string) {
        this.error = error;
    }

    setUser(user: IUser | null) {
        this.user = user;
    }

    startLoading() {
        this.loading = true;
        this.error = '';
    }

    endLoading() {
        this.loading = false;
    }
}
