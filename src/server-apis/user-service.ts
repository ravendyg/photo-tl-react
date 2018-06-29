/// <reference path="./../../typings/tsd.d.ts" />

// import {config} from './../config.ts';
const aja: AjaType = vendor.aja;
const config: (query: any) => string = require('./../config.ts');

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
        var q = this._signUpIn(userRequest, {
                    method: 'GET',
                    url: config('url') + config('port') + config('userDriver') + '/sign-in'
                });
        return q;
    }

    public signup (userRequest: TUserRequest) {
        return this._signUpIn(userRequest, {
                    method: 'POST',
                    url: config('url') + config('port') + config('userDriver') + '/new-user'
                });
    }

    // remove cookie
    public signout(): void {
        aja()
            .method(`DELETE`)
            .url(config('url') + config('port') + config('userDriver'))
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
