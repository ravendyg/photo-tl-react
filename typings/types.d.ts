declare type UserType = {
    name: string,
    pas?: string,
    pas2?: string,
    rem?: boolean,
    error?: string,
    then?: any
}

declare type dialogsType = {
    in: boolean,
    up: boolean
}


declare type TodoType = {
    id: number,
    text: string,
    completed: boolean
};

declare type StateType = {
    user: UserType,
    dialogs: dialogsType;
    
    nextTodo: TodoType,
    todos: TodoType [],
    visibilityFilter
};

declare type ActionType = {
    type: number;
    payload?: {
        id?: number,
        mode?: boolean,
        filter?: number,
        name?: string,
        text?: string
    };
};

declare type TodoAppType = {
    todos?: any [],
    visibilityFilter?: string
};

declare type AjaType = () => IAja;