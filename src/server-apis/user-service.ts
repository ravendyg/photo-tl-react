import { TUserRequest } from '../../typings/types';
import {
    IActionCreators,
    IImageService,
    ISocketService,
    IStore,
    IPromise,
    IUserService
} from '../../typings/interfaces';
import {getApiUrl} from '../config';

import * as aja from 'aja';

const SocketService: ISocketService = require('./socket-service.ts').SocketService;
const ImageService: IImageService = require('./image-service.ts').ImageService;

const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
const store: IStore = require('./../store.ts').Store;

class UserServiceClass implements IUserService {

    // generic sign up or in operation
    private _signUpIn (userRequest: TUserRequest, options) {
        var promise: IPromise = new Promise ( (resolve, reject) => {
            aja()
                .method(options.method)
                .header('Content-Type', 'application/json')
                .url(options.url)
                .data(userRequest)
                .on(`200`, user => {
                    store.dispatch(actionCreators.signInUser(user));
                    SocketService.connect();
                    resolve();
                })
                .on('40x', err => {
                    reject(JSON.parse(err).error);
                })
                .on(`50x`, err => {
                    reject(JSON.parse(err).error);
                })
                .go();
        });

        return promise;
    }

    public signin(userRequest: TUserRequest) {
        return this._signUpIn(
            userRequest,
            {
                method: 'POST',
                url: getApiUrl('/session')
            }
        );
    }

    public signup (userRequest: TUserRequest) {
        return this._signUpIn(
            userRequest,
            {
                method: 'POST',
                url: getApiUrl('/user')
            }
        );
    }

    // remove cookie
    public signout(): void {
        aja()
            .method(`DELETE`)
            .url(getApiUrl('/session'))
            .on(`20*`, resp => {
                store.dispatch(actionCreators.signOutUser());
            })
            .on('40x', console.error)
            .on(`50x`, console.error)
            .go();

        store.dispatch(actionCreators.signOutUser());
        SocketService.disconnect();
    }
}

export const UserService = new UserServiceClass();
