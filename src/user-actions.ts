/// <reference path="../typings/tsd.d.ts" />

const actionCreators: IActionCreators = require('./action-creators.ts').actionCreators;
const store: IStore = require('./store.ts');

const UserService: IUserService = require('./server-apis/user-service.ts').UserService;

console.log(UserService);

class UserActionsClass implements IUserActions {
    constructor () {
        
    }
    
    public displaySignin () {
        store.dispatch(actionCreators.setInDialog(true));
    }
    
    public displaySignup () {
        store.dispatch(actionCreators.setUpDialog(true));
    }
    
    public hideSignin () {
        store.dispatch(actionCreators.setInDialog(false));
    }
    
    public hideSignup () {
        store.dispatch(actionCreators.setUpDialog(false));
    }
    
    public signin (name: string, pas: string, rem: boolean) {
        UserService.signin({
            name, pas, rem
        });
    }
}

export const UserActions = new UserActionsClass();