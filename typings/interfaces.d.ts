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
    new (args?: any []): IReactComponent;   
    props: any; 
    input: HTMLInputElement;
    unsubscribe (): void;
    componentDidMount (): void;
    componentWillUnmount (): void;
    render (): void;
    forceUpdate: () => void;
    contexct: any;
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
