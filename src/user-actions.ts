import { IUserActions } from '../typings/interfaces';

import {ActionCreators} from './action-creators';
import {Store} from './store';

import {UserService} from './server-apis/user-service';
import {ImageService} from './server-apis/image-service';
import {SocketService} from './server-apis/socket-service';

class UserActionsClass implements IUserActions {

    constructor () {
    }

    public displaySignin () {
        Store.dispatch(ActionCreators.setInDialog());
    }

    public displaySignup () {
        Store.dispatch(ActionCreators.setUpDialog());
    }

    public displayPhotoUpload () {
        Store.dispatch(ActionCreators.setUploadDialog());
    }

    public displayPhotoEdit (_id: string) {
        Store.dispatch(ActionCreators.setEditDialog(_id));
    }

    public hideDialogs () {
        Store.dispatch(ActionCreators.hideDialogs());
    }

    public signin(name: string, pas: string, rem: boolean) {
        return UserService.signin({
            name, pas, rem,
        });
    }

    public signup(name: string, pas: string, rem: boolean) {
        return UserService.signup({
            name, pas, rem,
        });
    }

    public signout() {
        UserService.signout();
    }

    public vote = SocketService.vote;

    public deletePhoto(iid: string): void {
        SocketService.deletePhoto(iid);
    }

    public postComment(iid: string, text: string): void {
        SocketService.postComment(iid, text);
    }

    public deleteComment (_id: string, cid: string): void {
        SocketService.deleteComment(_id, cid);
    }

    public uploadPhoto (photo: any, title: string, text: string): void {
        ImageService.uploadPhoto(photo)
            .then(
                iid => {
                    SocketService.uploadPhoto(iid, title, text);
                },
                err => {
                    console.error(err);
                    Store.dispatch(ActionCreators.hideDialogs());
                }
            );
    }

    public editPhoto (_id: string, title: string, text: string): void {
        SocketService.editPhoto(_id, title, text);
    }
}

export const UserActions = new UserActionsClass();
