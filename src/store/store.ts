import {ICommonStore, CommonStore} from './commonStore';
import {IUserStore, UserStore} from './userStore';
import {IPhotoStore, PhotoStore} from './photoStore';
import {IUserService} from '../services/UserService';

export interface IAppStore {
    commonStore: ICommonStore;
    photoStore: IPhotoStore;
    userStore: IUserStore;
}

interface ICreateStoreArgs {
    userService: IUserService,
}

export function createStore({
    userService,
}: ICreateStoreArgs): IAppStore {
    const commonStore = new CommonStore();
    const photoStore = new PhotoStore();
    const userStore = new UserStore(userService, commonStore);

    const store: IAppStore = {
        commonStore,
        photoStore,
        userStore,
    };

    return store;
}

