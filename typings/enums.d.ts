declare type Actions = {
    ADD_TODO?: number,
    TOGGLE_TODO?: number,
    SET_VISIBITY_FILTER?: number
    
    SIGNIN_USER?: number;
    SIGNOUT_USER?: number;
    
    SET_IN_DIALOG?: number;
    SET_UP_DIALOG?: number;
    HIDE_DIALOGS?: number;
};

declare type Filters = {
    SHOW_COMPLETED?: number,
    SHOW_ACTIVE?: number,
    SHOW_ALL?: number
};