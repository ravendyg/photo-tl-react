/// <reference path="../typings/tsd.d.ts" />

const Redux: IRedux = vendor.Redux;

const polyfils = require('./utils/polyfils.ts');
const actions: Actions = require('./consts.ts').Actions;
const filters: Filters = require('./consts.ts').Filters;

import {TodoApp} from './components/TodoApp.tsx';
// const TodoApp = require('./components/TodoApp.tsx');

// reducers
const nextTodo = (state = 0, action: IAction) => {
    switch (action.type) {
        
        case actions.ADD_TODO:
            return state+1;
            
        default:
            return state
    }
};

const todo = (state, action: IAction) => {
    switch (action.type) {
        
        case actions.ADD_TODO:
            return {
                id: action.payload.id,
                text: action.payload.text,
                completed: false
            }
            
        case actions.TOGGLE_TODO:
            if (state.id === action.payload.id) {
                return polyfils.objectAssign({}, [state, {completed: !state.completed}]);
            } else {
                return state;
            }
            
        default:
            return state;
    }
};

const todos = (state = [], action: IAction) => {
    switch (action.type) {
        
        case actions.ADD_TODO:
            return [
                ...state,
                todo(undefined, action)                
            ];
            
        case actions.TOGGLE_TODO:
            return state.map( t => todo(t, action));
    
        default:
            return state;
    }   
};

const visibilityFilter = (state = filters.SHOW_ALL, action: IAction) => {
    switch (action.type) {
        
        case actions.SET_VISIBITY_FILTER:
            return action.payload.filter;
                
        default:
            return state;
    }
};

// const todoApp = (state: ITodoApp = {}, action: IAction) => {
//     return {
//         todos: todos (
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter (
//             state.visibilityFilter,
//             action
//         )
//     };
// };

// const combineReducers = (reducers) => {
//     return (state = {}, action: IAction) => {
//         return Object.keys(reducers).reduce(
//             (nextState, key) => {
//                 nextState[key] = reducers[key](
//                     state[key],
//                     action
//                 );
//                 return nextState;
//             },
//             {}
//         );
//     }
// }

const todoApp = Redux.combineReducers({
    nextTodo,
    todos,
    visibilityFilter
});

export = Redux.createStore(todoApp);