import {ICommonStore, CommonStore} from './commonStore';
import {IUserStore, UserStore} from './userStore';
import {IPhotoStore, PhotoStore} from './photoStore';
import {IUserService} from '../services/UserService';
import {IWebSocketService} from '../services/WebSocketService';
import {IPhotoService} from '../services/PhotoService';

export interface IAppStore {
    commonStore: ICommonStore;
    photoStore: IPhotoStore;
    userStore: IUserStore;
}

interface ICreateStoreArgs {
    userService: IUserService;
    webSocketService: IWebSocketService;
    photoService: IPhotoService;
}

export function createStore({
    userService,
    webSocketService,
    photoService,
}: ICreateStoreArgs): IAppStore {
    const commonStore = new CommonStore();
    const userStore = new UserStore(userService, commonStore);
    const photoStore = new PhotoStore(webSocketService, photoService);

    const store: IAppStore = {
        commonStore,
        photoStore,
        userStore,
    };

    return store;
}

