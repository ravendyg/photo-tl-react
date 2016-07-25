/// <reference path="./../../typings/tsd.d.ts" />

// import {config} from './../config.ts';
const aja: AjaType = vendor.aja;
const config: (query: any) => string = require('./../config.ts');

const SocketService: ISocketService = require('./socket-service.ts').SocketService;
const ImageService: IImageService = require('./image-service.ts').ImageService;

const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
const store: IStore = require('./../store.ts').Store;

class UserServiceClass implements IUserService{
//     private _http: any;
//     private _q: any;
//     private _userActions: IUserActions;
//     private _loggedInUser: any;

    constructor (
        // $http, $q, socketService, userActions: IUserActions
        ) {
//         this._http = $http;
//         this._q = $q;

//         this._userActions = userActions;
// window.socketService = socketService;
    }

//     public getUserFromMemory () {
//         // check session storage
//         var cookies: string [] = document.cookie.split(';');
//         var name = cookies.filter( (obj) => obj.indexOf('uId=') > -1 )[0];
//         if (name) {
//             // already logged in
//             // verify
//             this._http({
//                 method: 'GET',
//                 url: config('url') + config('port') + config('userDriver') + '/verify-user',
//                 params: {name: name.split('%7C')[0].split('=')[1]}
//             }).then( (response) => {
//                 this._socketService.connect(config('url') + config('port'));
//                 this._userActions.confirmed(response.data.name);
//             }, (response) => {
//             })
//         }
//     }

    // generic sign up or in operation
    private _signUpIn (user: UserType, options) {
        var promise: IPromise = new Promise ( (resolve, reject) => {
            aja()
                .method(options.method)
                .url(options.url)
                .data(user)
                .on(`200`, resp => {
                    console.log(resp);
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

    public signin (user: UserType) {
        var q= this._signUpIn(user, {
                    method: 'GET',
                    url: config('url') + config('port') + config('userDriver') + '/sign-in'
                });
                console.log(q);
                return q;
    }

    public signup (user: UserType) {
        return this._signUpIn(user, {
                    method: 'POST',
                    url: config('url') + config('port') + config('userDriver') + '/new-user'
                });
    }

    // remove cookie
    public signout (user: UserType): void {
        aja()
            .method(`DELETE`)
            .url(config('url') + config('port') + config('userDriver') + '/sign-out?name=' + user.name)
            .on(`200`, resp => {
                console.log(resp);
            })
            .on('40x', resp => {
                console.log(resp);
            })
            .on(`50x`, resp => {
                console.log(resp);
            })
            .go();

        store.dispatch(actionCreators.signOutUser());
        SocketService.disconnect();
    }
}

export const UserService = new UserServiceClass();