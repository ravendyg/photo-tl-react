/// <reference path="../typings/tsd.d.ts" />

const Redux: IRedux = vendor.Redux;

const Utils: IUtils = require('./utils/utils.ts');

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

const dialogs = (state: dialogsType, action: ActionType) => {
    // new state doesn't depend on the previous one
    let def: dialogsType = { in: false, up: false, upload: false};
    
    switch (action.type) {
        
        case actions.SET_IN_DIALOG:
            def.in = true
            return def;
            
        case actions.SET_UP_DIALOG:
            def.up = true
            return def;
            
        case actions.SET_UPLOAD_DIALOG:
            def.upload = true
            return def;
            
        case actions.HIDE_DIALOGS:
            return def;
    
        default:
            return def;
    }  
};

const photo = (state, action: ActionType) => {
    let tmp: ImageType
    
    switch (action.type) {
        case actions.ADD_PHOTO:
            return action.payload.photo;
            
        case actions.DELETE_PHOTO:
            if (action.payload._id !== state._id) return true;
            else return false;
            
        case actions.VOTE:
            tmp = Utils.objectAssign({}, [state]);
            tmp.averageRating = action.payload.newRating.averageRating;
            tmp.rating = [
                // select all other user's votes
                ...tmp.rating.filter(e => e.user !== action.payload.newRating.ratingElem.user),
                // add from this one
                action.payload.newRating.ratingElem
            ]           
            return tmp;
            
        case actions.POST_COMMENT:
            tmp = Utils.objectAssign({}, [state]);
            tmp.comments = [
                ...tmp.comments,
                action.payload.newComment.comment
            ]
            return tmp;
            
        case actions.DELETE_COMMENT:
            tmp = Utils.objectAssign({}, [state]);
            tmp.comments = tmp.comments.filter(e => e.date !== action.payload.date);
            return tmp;
    
        default:
            return state;
    }
}

const photos = (state: ImageType [] = [], action: ActionType) => {
    switch (action.type) {
        case actions.ADD_PHOTO:
            return [
                ...state,
                photo(undefined, action)
            ];
            
        case actions.DELETE_PHOTO:
            return state.filter( p => photo(p, action));
            
        case actions.ADD_PHOTOS:
            return Utils.mergeUnic( [state, action.payload.photos], (el1, el2) => {
                                                                    if (el1._id > el2._id) return 1;
                                                                    if (el1._id < el2._id) return -1;
                                                                    return 0;      
                                                                }
            );
            
        case actions.VOTE:
            for (let i=state.length-1; i>=0; i--) {
                if (state[i]._id === action.payload.newRating._id) {                    
                    return [
                        ...state.slice(0,i),
                        photo(state[i], action),
                        ...state.slice(i+1)
                    ]
                }
            }
            // not found?!
            return state;
            
        case actions.POST_COMMENT:
            for (let i=state.length-1; i>=0; i--) {
                if (state[i]._id === action.payload.newComment.id) {                    
                    return [
                        ...state.slice(0,i),
                        photo(state[i], action),
                        ...state.slice(i+1)
                    ]
                }
            }
            // not found?!
            return state;
            
        case actions.DELETE_COMMENT:
            for (let i=state.length-1; i>=0; i--) {
                if (state[i]._id === action.payload._id) {                    
                    return [
                        ...state.slice(0,i),
                        photo(state[i], action),
                        ...state.slice(i+1)
                    ]
                }
            }
            // not found?!
            return state;
            
        default:
            return state;
    }
}


// const todo = (state, action: ActionType) => {
//     switch (action.type) {
        
//         case actions.ADD_TODO:
//             return {
//                 id: action.payload.id,
//                 text: action.payload.text,
//                 completed: false
//             }
            
//         case actions.TOGGLE_TODO:
//             if (state.id === action.payload.id) {
//                 return polyfils.objectAssign({}, [state, {completed: !state.completed}]);
//             } else {
//                 return state;
//             }
            
//         default:
//             return state;
//     }
// };

// const todos = (state = [], action: ActionType) => {
//     switch (action.type) {
        
//         case actions.ADD_TODO:
//             return [
//                 ...state,
//                 todo(undefined, action)                
//             ];
            
//         case actions.TOGGLE_TODO:
//             return state.map( t => todo(t, action));
    
//         default:
//             return state;
//     }   
// };

// const visibilityFilter = (state = filters.SHOW_ALL, action: ActionType) => {
//     switch (action.type) {
        
//         case actions.SET_VISIBITY_FILTER:
//             return action.payload.filter;
                
//         default:
//             return state;
//     }
// };

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

const photoApp = Redux.combineReducers({
    user,
    dialogs,
    photos
});

export = Redux.createStore(photoApp);