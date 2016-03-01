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

interface IRedux {
    createStore (reducer: any): IStore;
}

interface IReact {
    
}

interface IReactDom {
    render: any;
}