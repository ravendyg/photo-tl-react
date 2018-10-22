import {ICommonStore, CommonStore} from './commonStore';
import {IUserStore, UserStore} from './userStore';
import {IPhotoStore, PhotoStore} from './photoStore';
import {IUserService} from '../services/UserService';
import {IWebSocketService} from '../services/WebSocketService';

export interface IAppStore {
    commonStore: ICommonStore;
    photoStore: IPhotoStore;
    userStore: IUserStore;
}

interface ICreateStoreArgs {
    userService: IUserService;
    webSocketService: IWebSocketService;
}

export function createStore({
    userService,
    webSocketService,
}: ICreateStoreArgs): IAppStore {
    const commonStore = new CommonStore();
    const userStore = new UserStore(userService, commonStore);
    const photoStore = new PhotoStore(webSocketService);

    const store: IAppStore = {
        commonStore,
        photoStore,
        userStore,
    };

    return store;
}

