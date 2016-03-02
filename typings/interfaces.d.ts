declare type State = any;

interface IAction {
    type: string;
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
}

interface IReact {
    Component: ReactComponent;
}


interface IReactDom {
    render: any;
}