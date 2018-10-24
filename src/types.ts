import {IUserStore} from './store/userStore';
import {IUserActions} from './actions/UserActions';

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
    userActions: IUserActions;
    userStore: IUserStore;
}
