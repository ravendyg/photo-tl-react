import {
    TAction,
    TState,
    TUser,
    IImage,
    IImageExtended,
    TRating,
    TComment,
    TUserRequest
} from './types';

interface IStore {
    getState (): TState;
    dispatch (action: TAction): void;
    subscribe (callback: any): () => void;
}

interface IPromise {
    then: (
        resolve?: (...args: any []) => void,
        reject?: (...args: any []) => void
    ) => void;
}

interface IActionCreators {
    signInUser (user: TUser): TAction;
    signOutUser (): TAction;

    setInDialog (): TAction;
    setUpDialog (): TAction;
    setUploadDialog (): TAction;
    setEditDialog (_id: string): TAction;
    hideDialogs (): TAction;

    addPhoto(photo: IImage): TAction;
    addPhotos (photos: IImageExtended[]): TAction;
    deletePhoto(id: string): TAction;
    editPhoto(dataChange: IImage): TAction;
    deleteComment(deletedComment: TComment): TAction;

    votePhoto (newRating: TRating): TAction;
    postComment(comment: TComment): TAction;
}

interface IUserActions {
    displaySignup: () => void;
    displaySignin: () => void;
    displayPhotoUpload: () => void;
    displayPhotoEdit: (_id: string) => void;
    hideDialogs: () => void;
    signin: (name: string, pas: string, rem: boolean) => IPromise;
    signup: (name: string, pas: string, rem: boolean) => IPromise;
    signout: () => void;

    vote: (vote: number, _id: string) => void;
    deletePhoto: (_id: string) => void;
    postComment: (iid: string, text: string) => void;
    deleteComment: (cid: string) => void;

    uploadPhoto: (photo: any, title: string, text: string) => void;
    editPhoto: (_id: string, title: string, text: string) => void;
}

interface IUserService {
    signin(user: TUserRequest): IPromise;
    signup(user: TUserRequest): IPromise;
    signout(): void;
}

interface ISocketService {
    connect (): void;
    disconnect (): void;
    getConnection (): any;
    deletePhoto(iid: string): void;
    uploadPhoto (filename: string, title: string, text: string): void;
    editPhoto (id: string, title: string, text: string): void;
    vote (newVote: number, _id: string): void;
    postComment(iid: string, text: string): void;
    deleteComment (id: string, cid: string): void;
}

interface IImageService {
    uploadPhoto (photo: any): IPromise;
}

interface IUtils {
    sortNumericArray (arr: number [], order: number): number [];
    transformDate (num: number): string;
    objectAssign (target: any, sources: any []): any;
    mergeUnic (arrs: any [], compare: (el1: any, el2: any) => number): any [];
    formatDate(timestamp: number): string;
}
