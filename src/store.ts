/// <reference path="../typings/tsd.d.ts" />

const Redux: IRedux = vendor.Redux;

import polyfils from './utils/polyfils.ts';
import consts from './consts.ts';



import {TodoApp} from './components/TodoApp.tsx';

// reducers
const todo = (state, action: IAction) => {
    switch (action.type) {
        
        case consts.ADD_TODO:
            return {
                id: action.payload.id,
                text: action.payload.text,
                completed: false
            }
            
        case consts.TOGGLE_TODO:
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
        
        case consts.ADD_TODO:
            return [
                ...state,
                todo(undefined, action)                
            ];
            
        case consts.TOGGLE_TODO:
            return state.map( t => todo(t, action));
    
        default:
            return state;
    }   
};

const visibilityFilter = (state = consts.SHOW_ALL, action: IAction) => {
    switch (action.type) {
        
        case consts.SET_VISIBITY_FILTER:
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
    todos,
    visibilityFilter
});

export const store = Redux.createStore(todoApp);