interface IStore {
    getState (): StateType;
    dispatch (action: ActionType): void;
    subscribe (callback: any): () => void;
}

interface IRedux {
    createStore (reducer: any): IStore;
    combineReducers (reducers: any): any;
}

interface IReactComponent {
    new (): IReactComponent;   
    props: any; 
    input: HTMLInputElement;
    unsubscribe (): void;
    componentDidMount (): void;
    componentWillUnmount (): void;
    render (): void;
    forceUpdate: () => void;
    contexct: any;
}

interface IListeningComponent extends IReactComponent {
    new (store: IStore): IListeningComponent;
    _store: IStore;
}

interface IReact {
    Component: IReactComponent;
    PropTypes: any;
}

interface IReactDom {
    render: any;
}

interface IActionCreators {
    setVisibilityFilter (filter: number): ActionType;
    toggleTodo (id: number): ActionType;
    addTodo (text: string): ActionType;
}
