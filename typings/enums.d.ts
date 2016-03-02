declare type Actions = {
    ADD_TODO?: number;
    TOGGLE_TODO?: number;
    SET_VISIBITY_FILTER?: number;    
}

declare type Filters = {
    SHOW_COMPLETED?: number,
    SHOW_ACTIVE?: number,
    SHOW_ALL?: number
}