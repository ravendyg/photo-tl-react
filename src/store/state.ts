import {IUserState, UserStore} from './userStore';
import {IUserService} from '../services/UserService';

export interface IAppState {
    userState: IUserState;
}

interface ICreateStoreArgs {
    userService: IUserService,
}

export function createState({
    userService,
}: ICreateStoreArgs): IAppState {

    const state: IAppState = {
        userState: new UserStore(userService),
    };

    return state;
}

