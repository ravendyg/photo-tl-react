import { IUserStore } from './store/userStore';
import { IUserActions } from './actions/UserActions';
import { ICommentActions } from './actions/CommentActions';
import { ICommonStore } from './store/commonStore';
import { IPhotoStore } from './store/photoStore';
import { IPhotoActions } from './actions/PhotoActions';
import { IConnectionStore } from './store/connectionStore';
import { ICommonActions } from './actions/CommonActions';
import { ICommentStore } from './store/commentStore';

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

export interface IPhoto {
    iid: string;
    description: string;
    extension: string;
    title: string;
    uploadedBy: IUser;
    uploaded: string;
    changed: string;
    commentCount: number;
    averageRating: number;
    ratingCount: number
    userRating: number;
    views: number;
}

export interface IPhotoPatch {
    iid: string;
    description: string;
    title: string;
    changed: string;
}

export interface IDeps {
    commonActions: ICommonActions;
    commonStore: ICommonStore;
    connectionStore: IConnectionStore;
    photoActions: IPhotoActions;
    photoStore: IPhotoStore;
    commentActions: ICommentActions;
    commentStore: ICommentStore;
    userActions: IUserActions;
    userStore: IUserStore;
}

export interface IRating {
    uid: string;
    iid: string;
    value: number;
    count: number;
    averageRating: number;
}

export interface IComment {
    cid: string;
    iid: string;
    uid: string;
    userName: string;
    date: string;
    text: string;
}

export interface IDeletedComment {
    cid: string;
    iid: string;
}
