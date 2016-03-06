/// <reference path="../typings/tsd.d.ts" />

const actionCreators: IActionCreators = require('./action-creators.ts').actionCreators;
const store: IStore = require('./store.ts');

const UserService: IUserService = require('./server-apis/user-service.ts').UserService;

class UserActionsClass implements IUserActions {
    constructor () {
        
    }
    
    public displaySignin () {
        store.dispatch(actionCreators.setInDialog(true));
    }
    
    public displaySignup () {
        store.dispatch(actionCreators.setUpDialog(true));
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
}

export const UserActions = new UserActionsClass();