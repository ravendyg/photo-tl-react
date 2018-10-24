import {ICommonStore} from './commonStore';
import {IUserStore} from './userStore';
import {IPhotoStore, PhotoStore} from './photoStore';
import {IWebSocketService} from '../services/WebSocketService';
import {IPhotoService} from '../services/PhotoService';

export interface IAppStore {
    commonStore: ICommonStore;
    photoStore: IPhotoStore;
    userStore: IUserStore;
}

interface ICreateStoreArgs {
    userStore: IUserStore;
    commonStore: ICommonStore;
    webSocketService: IWebSocketService;
    photoService: IPhotoService;
}

export function createStore({
    userStore,
    commonStore,
    webSocketService,
    photoService,
}: ICreateStoreArgs): IAppStore {

    const photoStore = new PhotoStore(webSocketService, photoService);

    const store: IAppStore = {
        commonStore,
        photoStore,
        userStore,
    };

    return store;
}

