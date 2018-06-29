/// <reference path="../typings/tsd.d.ts" />

const Redux: IRedux = vendor.Redux;

import {Utils} from './utils/utils.ts';

import {Actions} from './action-creators';
import {Filters} from './consts.ts';

// reducers
const user = (state: TUser = null, action: ActionType) => {
    switch (action.type) {
        case Actions.SIGNIN_USER:
            return action.payload.user;

        case Actions.SIGNOUT_USER:
            return null;

        default:
            return state;
    }
};

const dialogs = (state: dialogsType, action: ActionType) => {
    // new state doesn't depend on the previous one
    let def: dialogsType = { in: false, up: false, upload: false, editPhoto: ``};

    switch (action.type) {

        case Actions.SET_IN_DIALOG:
            def.in = true
            return def;

        case Actions.SET_UP_DIALOG:
            def.up = true
            return def;

        case Actions.SET_UPLOAD_DIALOG:
            def.upload = true
            return def;

        case Actions.SET_EDIT_DIALOG:
            def.editPhoto = action.payload._id;
            return def;

        case Actions.HIDE_DIALOGS:
            return def;

        default:
            return def;
    }
};

const photo = (state, action: ActionType) => {
    let tmp: ImageType = Utils.objectAssign({}, [state]);

    switch (action.type) {
        case Actions.ADD_PHOTO:
            return action.payload.photo;

        case Actions.DELETE_PHOTO:
            if (action.payload._id !== state._id) return true;
            else return false;

        case Actions.VOTE:
            tmp.averageRating = action.payload.newRating.averageRating;
            tmp.rating = [
                // select all other user's votes
                ...tmp.rating.filter(e => e.user !== action.payload.newRating.ratingElem.user),
                // add from this one
                action.payload.newRating.ratingElem
            ]
            return tmp;

        case Actions.POST_COMMENT:
            tmp.comments = [
                ...tmp.comments,
                action.payload.newComment.comment
            ]
            return tmp;

        case Actions.DELETE_COMMENT:
            tmp.comments = tmp.comments.filter(e => e.date !== action.payload.date);
            return tmp;

        case Actions.EDIT_PHOTO:
            tmp.description = action.payload.dataChange.text;
            tmp.title = action.payload.dataChange.title;
            tmp.changed = action.payload.dataChange.time;
            tmp.changedBy = action.payload.dataChange.user
            return tmp;


        default:
            return state;
    }
}

const photos = (state: ImageType [] = [], action: ActionType) => {
    // creates new array of photos requesting change of selected one from photo reducer
    function transferHelper (state, comparator, action) {
        for (let i=state.length-1; i>=0; i--) {
            if (state[i]._id === comparator) {
                return [
                    ...state.slice(0,i),
                    photo(state[i], action),
                    ...state.slice(i+1)
                ]
            }
        }
        // not found?!
        return state;
    }

    switch (action.type) {
        case Actions.ADD_PHOTO:
            return [
                ...state,
                photo(undefined, action)
            ];

        case Actions.DELETE_PHOTO:
            return state.filter( p => photo(p, action));

        case Actions.ADD_PHOTOS:
            return Utils.mergeUnic( [state, action.payload.photos], (el1, el2) => el1._id - el2._id);

        case Actions.VOTE:
            return transferHelper(state, action.payload.newRating._id, action);

        case Actions.POST_COMMENT:
            return transferHelper(state, action.payload.newComment.id, action);

        case Actions.DELETE_COMMENT:
            return transferHelper(state, action.payload._id, action);

        case Actions.EDIT_PHOTO:
            return transferHelper(state, action.payload.dataChange._id, action);

        default:
            return state;
    }
}

const photoApp = Redux.combineReducers({
    user,
    dialogs,
    photos
});

const win: any = window;

export const Store = Redux.createStore(photoApp, win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__());
