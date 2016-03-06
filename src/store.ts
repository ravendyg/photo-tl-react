/// <reference path="../typings/tsd.d.ts" />

const Redux: IRedux = vendor.Redux;

const polyfils = require('./utils/polyfils.ts');
const actions: Actions = require('./action-creators.ts').Actions;
const filters: Filters = require('./consts.ts').Filters;

// reducers
const user = (state: UserType = { name: `` }, action: ActionType) => {
    switch (action.type) {
        case actions.SIGNIN_USER:
            return {
                name: action.payload.user.name,
            };
            
        case actions.SIGNOUT_USER:
            return {
                name: ``,
            };
    
        default:
            return state;
    }
};

const dialogs = (state: dialogsType = {
    in: false,
    up: false
}, action: ActionType) => {
    switch (action.type) {
        
        case actions.SET_IN_DIALOG:
            return {
                in: action.payload.mode,
                up: state.up
            };
            
        case actions.SET_UP_DIALOG:
            return {
                in: state.in,
                up: action.payload.mode
            };
            
        case actions.HIDE_DIALOGS:
            return {
                in: false,
                up: false
            };
    
        default:
            return state;
    }  
};

const todo = (state, action: ActionType) => {
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

const todos = (state = [], action: ActionType) => {
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

const visibilityFilter = (state = filters.SHOW_ALL, action: ActionType) => {
    switch (action.type) {
        
        case actions.SET_VISIBITY_FILTER:
            return action.payload.filter;
                
        default:
            return state;
    }
};

// const todoApp = (state: ITodoApp = {}, action: ActionType) => {
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
//     return (state = {}, action: ActionType) => {
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
    user,
    todos,
    visibilityFilter,
    dialogs
});

export = Redux.createStore(todoApp);