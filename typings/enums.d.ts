declare type Actions = {   
    SIGNIN_USER?: number;
    SIGNOUT_USER?: number;
    
    SET_IN_DIALOG?: number;
    SET_UP_DIALOG?: number;
    HIDE_DIALOGS?: number;
    
    ADD_PHOTO?: number;
    ADD_PHOTOS?: number;
    DELETE_PHOTO?: number;
};

declare type Filters = {
    SHOW_COMPLETED?: number,
    SHOW_ACTIVE?: number,
    SHOW_ALL?: number
};