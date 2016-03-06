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
    state: any;
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
    signOutUser (): ActionType;
    
    setInDialog (mode: boolean): ActionType;
    setUpDialog (mode: boolean): ActionType;
    hideDialogs (): ActionType;
    
    setVisibilityFilter (filter: number): ActionType;
    toggleTodo (id: number): ActionType;
    addTodo (text: string): ActionType;
}

interface IUserActions {
    displaySignup: () => void;
    displaySignin: () => void;
    hideDialogs: () => void;
    // hideSignin: () => void;
    // hideSignup: () => void;
    signin: (name: string, pas: string, rem: boolean) => void;
    signup: (name: string, pas: string, pas2: string, rem: boolean) => void;
    signout: (name: string) => void;
}

interface IUserService {
    signin (user: UserType): void;
    signup (user: UserType): void;
    signout (user: UserType): void;
}

interface IAja {
    method: (type: string) => IAja;
    url: (url: string) => IAja;
    into: (element: string) => IAja;
    data: (data: any) => IAja;
    body: (data: any) => IAja;
    on: (code: string, callback: (resp: any) => void) => IAja;
    go: () => void; 
}

interface ISocketService {
    connect (url: string): void;
    disconnect (): void;
    getConnection (): any;
    removePhoto (_id: string): void;
    uploadPhoto (filename: string, title: string, text: string): void;
    editPhoto (id: string, title: string, text: string): void;
    vote (newVote: number, _id: string): void;
    comment (id: string, text: string): void;
    deleteComment (id: string, date: string): void;
}