declare type TodoType = {
    id: number,
    text: string,
    completed: boolean
};

declare type StateType = {
    nextTodo: TodoType,
    todos: TodoType [],
    visibilityFilter
};

declare type ActionType = {
    type: number;
    payload?: any;
};

declare type TodoAppType = {
    todos?: any [],
    visibilityFilter?: string
};