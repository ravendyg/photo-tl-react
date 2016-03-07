/// <reference path="../typings/tsd.d.ts" />

const actions: Actions = require('./consts.ts').Actions;

export enum Actions {  
    SIGNIN_USER = 3,
    SIGNOUT_USER = 4,
    
    SET_IN_DIALOG = 5,
    SET_UP_DIALOG = 6,
    HIDE_DIALOGS = 7,   
    
    ADD_PHOTO = 8,
    ADD_PHOTOS = 9,
    DELETE_PHOTO = 10,
    
}

var nextTodo = 0;

export const actionCreators: IActionCreators = {
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
    deletePhoto: (id: string) => {
        return {
            type: Actions.ADD_PHOTO,
            payload: {
                id
            }
        }
    },
   
    
    
    

}