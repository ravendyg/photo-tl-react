import {
    TImage,
    TComment,
    TUser,
    TRating
} from '../typings/types';
import { IActionCreators } from '../typings/interfaces';

export const Actions = {
    SIGNIN_USER: 'SIGNIN_USER',
    SIGNOUT_USER: 'SIGNOUT_USER',
    SET_IN_DIALOG: 'SET_IN_DIALOG',
    SET_UP_DIALOG: 'SET_UP_DIALOG',
    SET_UPLOAD_DIALOG: 'SET_UPLOAD_DIALOG',
    SET_EDIT_DIALOG: 'SET_EDIT_DIALOG',
    HIDE_DIALOGS: 'HIDE_DIALOGS',
    ADD_PHOTO: 'ADD_PHOTO',
    ADD_PHOTOS: 'ADD_PHOTOS',
    DELETE_PHOTO: 'DELETE_PHOTO',
    EDIT_PHOTO: 'EDIT_PHOTO',
    VOTE: 'VOTE',
    POST_COMMENT: 'POST_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
}

var nextTodo = 0;

export const ActionCreators: IActionCreators = {
    signInUser(user: TUser) {
      return {
          type: Actions.SIGNIN_USER,
          payload: {
              user
          }
      }
    },
    signOutUser() {
        return {
            type: Actions.SIGNOUT_USER,
            payload: {}
        }
    },

    setInDialog() {
        return {
            type: Actions.SET_IN_DIALOG,
            payload: {}
        };
    },
    setUpDialog() {
        return {
            type: Actions.SET_UP_DIALOG,
            payload: {}
        };
    },
    setUploadDialog() {
        return {
            type: Actions.SET_UPLOAD_DIALOG,
            payload: {}
        };
    },
    setEditDialog(id) {
        return {
            type: Actions.SET_EDIT_DIALOG,
            payload: { id }
        };
    },
    hideDialogs() {
        return {
            type: Actions.HIDE_DIALOGS,
            payload: {}
        };
    },
    addPhoto(photo: TImage) {
        return {
            type: Actions.ADD_PHOTO,
            payload: {
                photo
            }
        }
    },
    addPhotos(photos: TImage []) {
        return {
            type: Actions.ADD_PHOTOS,
            payload: {
                photos
            }
        }
    },
    deletePhoto(id: string) {
        return {
            type: Actions.DELETE_PHOTO,
            payload: { id }
        }
    },
    editPhoto(dataChange: TImage) {
        return {
            type: Actions.EDIT_PHOTO,
            payload: {
                dataChange
            }
        }
    },
    votePhoto(newRating: TRating) {
        return {
            type: Actions.VOTE,
            payload: {
                newRating
            }
        };
    },
    postComment(comment: TComment) {
        return {
            type: Actions.POST_COMMENT,
            payload: {
                newComment: comment
            }
        }
    },
    deleteComment(deletedComment: TComment) {
        return {
            type: Actions.DELETE_COMMENT,
            payload: {
                deletedComment
            }
        }
    }
}
