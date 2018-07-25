import {
    combineReducers,
    createStore
} from 'redux';
import {
    TAction,
    IImageExtended,
    TDialog,
    TUser,
} from '../typings/types';
import {Utils} from './utils/utils';
import {Actions} from './action-creators';

// reducers
const user = (state: TUser = null, action: TAction): TUser => {
    switch (action.type) {
        case Actions.SIGNIN_USER:
            return action.payload.user;

        case Actions.SIGNOUT_USER:
            return null;

        default:
            return state;
    }
};

const dialogs = (state: TDialog, action: TAction): TDialog => {
    // new state doesn't depend on the previous one
    let def: TDialog = { in: false, up: false, upload: false, editPhoto: ``};

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
            def.editPhoto = action.payload.id;
            return def;

        case Actions.HIDE_DIALOGS:
            return def;

        default:
            return def;
    }
};

const photo = (state: IImageExtended, action: TAction): IImageExtended => {
    switch (action.type) {
        case Actions.ADD_PHOTO:
            return {
                ...action.payload.photo,
                comments: [],
                ratings: [],
                views: 0,
            };

        case Actions.VOTE: {
            return {
                ...state,
                ratings: state.ratings
                    .filter(e => e.user !== action.payload.newRating.user)
                    .concat(action.payload.newRating)
            };
        }

        case Actions.POST_COMMENT: {
            return {
                ...state,
                comments: state.comments.concat(action.payload.newComment)
            };
        }

        case Actions.DELETE_COMMENT: {
            return {
                ...state,
                comments: state.comments.filter(e => e.cid !== action.payload.deletedComment.cid)
            };
        }

        default:
            return state;
    }
}

const photos = (state: IImageExtended[] = [], action: TAction): IImageExtended[] => {
    // creates new array of photos requesting change of selected one from photo reducer
    function transferHelper (state: IImageExtended[], iid, action) {
        for (let i = state.length-1; i >= 0; i--) {
            if (state[i].iid === iid) {
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
            return state.filter(({iid}) => action.payload.id !== iid);

        case Actions.ADD_PHOTOS:
            return Utils.mergeUnic( [state, action.payload.photos], (el1, el2) => el1._id - el2._id);

        case Actions.VOTE:
            return transferHelper(state, action.payload.newRating.image, action);

        case Actions.POST_COMMENT:
            return transferHelper(state, action.payload.newComment.iid, action);

        case Actions.DELETE_COMMENT:
            return transferHelper(state, action.payload.deletedComment.iid, action);

        case Actions.EDIT_PHOTO: {
            const { dataChange } = action.payload;
            if (!dataChange) {
                return state;
            }
            const {
                changed,
                description,
                iid,
                title
            } = dataChange;
            return state.map((image) => {
                if (image.iid === iid) {
                    return {
                        ...image,
                        changed,
                        description,
                        title,
                    };
                } else {
                    return image;
                }
            });
        }

        case Actions.ADD_VIEWS: {
            const {
                newViews: { iids },
            } = action.payload;
            const set = iids.reduce((acc, val) => ({
                ...acc,
                [val]: true,
            }), {});
            return state.map(image => ({
                ...image,
                views: image.views + (set[image.iid] ? 1 : 0),
            }));
        }

        default:
            return state;
    }
}

const photoApp = combineReducers({
    user,
    dialogs,
    photos
});

const win: any = window;

export const Store = createStore(photoApp, win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__());
