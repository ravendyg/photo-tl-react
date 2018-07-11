interface IStore {
    getState (): StateType;
    dispatch (action: ActionType): void;
    subscribe (callback: any): () => void;
}

interface IRedux {
    createStore (reducer: any, tools?: any): IStore;
    combineReducers (reducers: any): any;
}

interface IReactComponent {
    new (...args: any []): IReactComponent;
    props: any;
    input: HTMLInputElement;
    // unsubscribe (): void;
    // componentDidMount (): void;
    // componentWillUnmount (): void;
    render (): void;
    forceUpdate: () => void;
    context: any;
    // setState: (state: any) => void;
    // state: any;
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

interface IPromise {
    then: (
        resolve?: (...args: any []) => void,
        reject?: (...args: any []) => void
    ) => void;
}

interface IActionCreators {
    signInUser (user: TUser): ActionType;
    signOutUser (): ActionType;

    setInDialog (): ActionType;
    setUpDialog (): ActionType;
    setUploadDialog (): ActionType;
    setEditDialog (_id: string): ActionType;
    hideDialogs (): ActionType;

    addPhoto (photo: ImageType): ActionType;
    addPhotos (photos: ImageType []): ActionType;
    deletePhoto (id: string): ActionType;
    editPhoto (dataChange: DataChangeType): ActionType;
    deleteComment (_id: string, date: string): ActionType;

    votePhoto (newRating: RatingType): ActionType;
    postComment (newComment: {comment: CommentType, id: string}): ActionType;
}

interface IUserActions {
    displaySignup: () => void;
    displaySignin: () => void;
    displayPhotoUpload: () => void;
    displayPhotoEdit: (_id: string) => void;
    hideDialogs: () => void;
    // hideSignin: () => void;
    // hideSignup: () => void;
    signin: (name: string, pas: string, rem: boolean) => IPromise;
    signup: (name: string, pas: string, rem: boolean) => IPromise;
    signout: () => void;

    vote: (vote: number, _id: string) => void;
    deletePhoto: (_id: string) => void;
    postComment: (_id: string, text: string) => void;
    deleteComment: (_id: string, date: string) => void;

    uploadPhoto: (photo: any, title: string, text: string) => void;
    editPhoto: (_id: string, title: string, text: string) => void;
}


interface IUserService {
    signin(user: TUserRequest): IPromise;
    signup(user: TUserRequest): IPromise;
    signout(): void;
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
    connect (): void;
    disconnect (): void;
    getConnection (): any;
    removePhoto (_id: string): void;
    uploadPhoto (filename: string, title: string, text: string): void;
    editPhoto (id: string, title: string, text: string): void;
    vote (newVote: number, _id: string): void;
    postComment (_id: string, text: string): void;
    deleteComment (id: string, date: string): void;
}

interface IImageService {
    uploadPhoto (photo: any): IPromise;
}

interface IUtils {
    sortNumericArray (arr: number [], order: number): number [];
    transformDate (num: number): string;
    objectAssign (target: any, sources: any []): any;
    mergeUnic (arrs: any [], compare: (el1: any, el2: any) => number): any [];
    formatDate (date: string): string;
}
