/// <reference path="../typings/tsd.d.ts" />

const polyfils = require('./utils/polyfils.ts');
const actions: Actions = require('./consts.ts').Actions;

export enum Actions {
    ADD_TODO = 0,
    TOGGLE_TODO = 1,
    SET_VISIBITY_FILTER = 2,
    
    SIGNIN_USER = 3,
    SET_IN_DIALOG = 4,
    SET_UP_DIALOG = 5,
    HIDE_DIALOGS = 6,
    
    SIGNOUT_USER = 7
}

var nextTodo = 0;

export const actionCreators: IActionCreators = {
    signInUser: (user: UserType) => {
      return {
          type: Actions.SIGNIN_USER,
          payload: {
              user
          }
      }  
    },
    setInDialog: (mode: boolean) => {
        return {
            type: Actions.SET_IN_DIALOG,
            payload: {
                mode
            }
        };
    },
    setUpDialog: (mode: boolean) => {
        return {
            type: Actions.SET_UP_DIALOG,
            payload: {
                mode
            }
        };
    },
    hideDialogs: () => {
        return {
            type: Actions.HIDE_DIALOGS,
            payload: {}
        };
    },
    signOutUser: () => {
        return {
            type: Actions.SIGNOUT_USER,
            payload: {}
        }
    },
    
    
    
    
    setVisibilityFilter: (filter: number) => {
        return {
            type: Actions.SET_VISIBITY_FILTER,
            payload: {
                filter
            }
        }
    },
    toggleTodo: (id: number) => {
        return {
            type: Actions.TOGGLE_TODO,
            payload: {
                id
            }
        }
    },
    addTodo: (text: string) => {
        return {
            type: Actions.ADD_TODO,
            payload: {
                text,
                id: nextTodo++
            }
        }
    }
}