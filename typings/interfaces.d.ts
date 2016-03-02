interface ITodo {
    id: number,
    text: string,
    completed: boolean
}

declare type State = {
    nextTodo: ITodo,
    todos: ITodo [],
    visibilityFilter
};


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

interface IAction {
    type: number;
    payload?: any;
}

interface IStore {
    getState (): State;
    dispatch (action: IAction): void;
    subscribe (callback: any): void;
}

interface ITodoApp {
    todos?: any [],//(state: any [], action: IAction) => any [],
    visibilityFilter?: string //(state: string, action: IAction) => string
}

interface IRedux {
    createStore (reducer: any): IStore;
    combineReducers (reducers: any): any;
}

interface ReactComponent {
    new (args?: any []): ReactComponent;   
    props: any; 
    input: HTMLInputElement;
}

interface IReact {
    Component: ReactComponent;
}


interface IReactDom {
    render: any;
}
