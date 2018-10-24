import {ICommonStore} from './commonStore';
import {IUserStore} from './userStore';
import {IPhotoStore, PhotoStore} from './photoStore';
import {IWebSocketService} from '../services/WebSocketService';
import {IPhotoService} from '../services/PhotoService';

export interface IAppStore {
    photoStore: IPhotoStore;
}

interface ICreateStoreArgs {
    webSocketService: IWebSocketService;
    photoService: IPhotoService;
}

export function createStore({
    webSocketService,
    photoService,
}: ICreateStoreArgs): IAppStore {

    const photoStore = new PhotoStore(webSocketService, photoService);

    const store: IAppStore = {
        photoStore,
    };

    return store;
}

