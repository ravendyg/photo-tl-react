/// <reference path="../typings/tsd.d.ts" />

export enum Actions {
    SIGNIN_USER = 3,
    SIGNOUT_USER = 4,

    SET_IN_DIALOG = 5,
    SET_UP_DIALOG = 6,
    SET_UPLOAD_DIALOG = 12,
    SET_EDIT_DIALOG = 15,
    HIDE_DIALOGS = 7,

    ADD_PHOTO = 8,
    ADD_PHOTOS = 9,
    DELETE_PHOTO = 10,
    EDIT_PHOTO = 16,

    VOTE = 11,
    POST_COMMENT = 13,
    DELETE_COMMENT = 14,
}

var nextTodo = 0;

export const ActionCreators: IActionCreators = {
    signInUser: (user: UserType) => {
      return {
          type: Actions.SIGNIN_USER,
          payload: {
              user
          }
      }
    },
    signOutUser: () => {
        return {
            type: Actions.SIGNOUT_USER,
            payload: {}
        }
    },

    setInDialog: () => {
        return {
            type: Actions.SET_IN_DIALOG,
            payload: {}
        };
    },
    setUpDialog: () => {
        return {
            type: Actions.SET_UP_DIALOG,
            payload: {}
        };
    },
    setUploadDialog: () => {
        return {
            type: Actions.SET_UPLOAD_DIALOG,
            payload: {}
        };
    },
    setEditDialog: (_id) => {
        return {
            type: Actions.SET_EDIT_DIALOG,
            payload: {
                _id
            }
        };
    },
    hideDialogs: () => {
        return {
            type: Actions.HIDE_DIALOGS,
            payload: {}
        };
    },

    addPhoto: (photo: ImageType) => {
        return {
            type: Actions.ADD_PHOTO,
            payload: {
                photo
            }
        }
    },
    addPhotos: (photos: ImageType []) => {
        return {
            type: Actions.ADD_PHOTOS,
            payload: {
                photos
            }
        }
    },
    deletePhoto: (_id: string) => {
        return {
            type: Actions.DELETE_PHOTO,
            payload: {
                _id
            }
        }
    },
    editPhoto: (dataChange: DataChangeType) => {
        return {
            type: Actions.EDIT_PHOTO,
            payload: {
                dataChange
            }
        }
    },

    votePhoto: (newRating: NewRatingType) => {
        return {
            type: Actions.VOTE,
            payload: {
                newRating
            }
        };
    },

    postComment: (newComment: {comment: CommentType, id: string}) => {
        return {
            type: Actions.POST_COMMENT,
            payload: {
                newComment
            }
        }
    },

    deleteComment: (_id: string, date: string) => {
        return {
            type: Actions.DELETE_COMMENT,
            payload: {
                _id,
                date
            }
        }
    }



}