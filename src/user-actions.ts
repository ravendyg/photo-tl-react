/// <reference path="../typings/tsd.d.ts" />

const actionCreators: IActionCreators = require('./action-creators.ts').actionCreators;
const store: IStore = require('./store.ts');

const UserService: IUserService = require('./server-apis/user-service.ts').UserService;
const SocketService: ISocketService = require('./server-apis/socket-service.ts').SocketService;

class UserActionsClass implements IUserActions {
    
    constructor () { 
    }
    
    public displaySignin () {
        store.dispatch(actionCreators.setInDialog());
    }
    
    public displaySignup () {
        store.dispatch(actionCreators.setUpDialog());
    }
    
    public hideDialogs () {
        store.dispatch(actionCreators.hideDialogs());
    }
    
    public signin (name: string, pas: string, rem: boolean) {
        return UserService.signin({
            name, pas, rem
        });
    }
    
    public signup (name: string, pas: string, pas2: string, rem: boolean) {
        return UserService.signup({
            name, pas, pas2, rem
        });
    }
    
    public signout (name: string) {
        UserService.signout({
            name
        });
    }
    
    public vote (rating: number, _id: string): void {
        SocketService.vote(rating, _id);
    }
    
    public deletePhoto (_id: string): void {
        SocketService.removePhoto(_id);
    }
}

export const UserActions = new UserActionsClass();