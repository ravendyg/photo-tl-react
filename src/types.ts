import {IUserStore} from './store/userStore';
import {IUserActions} from './actions/UserActions';
import {ICommonStore} from './store/commonStore';
import {IPhotoStore} from './store/photoStore';
import {IPhotoActions} from './actions/PhotoActions';

export interface IUser {
    uid: string;
    name: string;
}

export interface IResponseContainer<T> {
    error: string;
    payload: T;
    status: number;
}

export interface IConfig {
    apiUrl: string;
}

export interface ISignArgs {
    login: string;
    pas: string;
}

export interface IComment {
    cid: string;
    date: number;
    text: string;
}

export interface IPhoto {
    iid: string;
    description: string;
    title: string;
    uploadedBy: IUser;
    uploaded: number;
    changed: number;
    commentCount: number;
    averageRating: number;
    ratingCount: number
    userRating: number;
    views: number;
}

export interface IDeps {
    commonStore: ICommonStore;
    photoActions: IPhotoActions;
    photoStore: IPhotoStore;
    userActions: IUserActions;
    userStore: IUserStore;
}
