/// <reference path="./../../typings/tsd.d.ts" />

// import {config} from './../config.ts';
const aja: AjaType = vendor.aja;
const config: (query: any) => string = require('./../config.ts');

class UserServiceClass implements IUserService{
//     private _http: any;
//     private _q: any;
//     private _socketService: ISocketService;
//     private _userActions: IUserActions;
//     private _loggedInUser: any;
    
    constructor (
        // $http, $q, socketService, userActions: IUserActions
        ) {
//         this._http = $http;
//         this._q = $q;
//         this._socketService = socketService;
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
console.log(user);

        aja()
            .method(options.method)
            .url(options.url)
            .data(user)
            .on(`200`, resp => {
                console.log(resp);
            })
            .on(`40*`, resp => {
                console.log(resp);
            })
            .on(`50*`, resp => {
                console.log(resp);
            })
            .go();
        
        
//         var deferred = this._q.defer();
//         var loggedInUser =  {
//                     name: '',
//                     pas: '',
//                     pas2: '',
//                     rem: false,
//                     error: ''
//                 };
//         this._http(options).then( (resp) => {
//             loggedInUser.name = resp.data.name;
//             deferred.resolve(loggedInUser);
//             this._socketService.connect(config('url') + config('port'));
//         },
//         (resp) => {
//             console.log(resp);
//             if (resp.data) {
//                 switch (resp.data.error) {
//                     case 'wrong password':
//                         loggedInUser.error = 'Неверный пароль';
//                     break;
//                     case 'wrong username':
//                         loggedInUser.error = 'Неверное имя пользователя';
//                     break;
//                 }
//             } else {
//                 loggedInUser.error = 'Неизвестная ошибка';
//             }
//             deferred.resolve(loggedInUser);
//         });
                
//         return deferred.promise;
    }
    
    public signin (user: UserType) {       
        this._signUpIn(user, {
                    method: 'GET',
                    url: config('url') + config('port') + config('userDriver') + '/sign-in'
                });
    }
    
//     public signup (user: IUser) {
//         return this._signUpIn(user, {
//                     method: 'POST',
//                     url: config('url') + config('port') + config('userDriver') + '/new-user',
//                     data: user
//                 });         
//     }
    
//     // remove cookie
//     public signout (user: IUser): void {
//         this._http({
//             method: 'DELETE',
//             url: config('url') + config('port') + config('userDriver') + '/sign-out?name=' + user.name
//         });
//         this._socketService.disconnect();;
//     }
}

export const UserService = new UserServiceClass();