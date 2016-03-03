/// <reference path="../typings/tsd.d.ts" />

const polyfils = require('./utils/polyfils.ts');
const actions: Actions = require('./consts.ts').Actions;

export enum Actions {
    ADD_TODO = 0,
    TOGGLE_TODO = 1,
    SET_VISIBITY_FILTER = 2
}

var nextTodo = 0;

export const actionCreators: IActionCreators = {
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