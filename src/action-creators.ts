/// <reference path="../typings/tsd.d.ts" />

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
