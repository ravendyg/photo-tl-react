/// <reference path="../typings/tsd.d.ts" />

import {ActionCreators} from './action-creators.ts';
import {Store} from './store.ts';

import {UserService} from './server-apis/user-service.ts';
import {ImageService} from './server-apis/image-service.ts';
import {SocketService} from './server-apis/socket-service.ts';

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

    public vote (rating: number, _id: string): void {
        SocketService.vote(rating, _id);
    }

    public deletePhoto (_id: string): void {
        SocketService.removePhoto(_id);
    }

    public postComment (_id: string, text: string): void {
        SocketService.postComment(_id, text);
    }

    public deleteComment (_id: string, text: string): void {
        SocketService.deleteComment(_id, text);
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
