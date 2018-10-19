import {ICommonState, CommonStore} from './commonStore';
import {IUserState, UserStore} from './userStore';
import {IUserService} from '../services/UserService';

export interface IAppStore {
    commonStore: ICommonState;
    userStore: IUserState;
}

interface ICreateStoreArgs {
    userService: IUserService,
}

export function createStore({
    userService,
}: ICreateStoreArgs): IAppStore {
    const commonStore = new CommonStore();

    const store: IAppStore = {
        commonStore,
        userStore: new UserStore(userService, commonStore),
    };

    return store;
}

