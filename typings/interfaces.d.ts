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
    new (...args: any []): IReactComponent;   
    props: any; 
    input: HTMLInputElement;
    unsubscribe (): void;
    componentDidMount (): void;
    componentWillUnmount (): void;
    render (): void;
    forceUpdate: () => void;
    contexct: any;
    getState (): any;
    setState (state: any): void; 
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
    signInUser (user: UserType): ActionType;
    setInDialog (mode: boolean): ActionType;
    setUpDialog (mode: boolean): ActionType;
    
    setVisibilityFilter (filter: number): ActionType;
    toggleTodo (id: number): ActionType;
    addTodo (text: string): ActionType;
}

interface IUserActions {
    displaySignup: () => void;
    displaySignin: () => void;
    hideSignup: () => void;
    hideSignin: () => void;
    // hideSignup: () => void;
    signin: (name: string, pas: string, rem: boolean) => void;
}

interface IUserService {
    signin (user: UserType): void;
}