import { UserData } from "../src/components/loggedin/user-data";

declare type TUserRequest = {
    name: string,
    pas: string,
    pas2?: string,
    rem: boolean,
}

declare type TUser = {
    uid: string,
    name: string,
}

declare type TDialog = {
    in: boolean,
    up: boolean,
    upload: boolean,
    editPhoto: string,
}

declare type TState = {
    user: TUser,
    dialogs: TDialog,
    photos: IImageExtended[],
};

declare type TAction = {
    type: string;
    payload?: {
        id?: string,
        filter?: number,
        name?: string,
        text?: string,
        user?: TUser,
        photo?: IImageExtended,
        photos?: IImageExtended [],
        newRating?: TRating,
        newComment?: TComment,
        date?: string,
        dataChange?: IImageExtended,
    };
};

declare type TRating = {
    rid: string,
    date: number,
    user: string,
    image: string,
    value: number
}

declare type IImageExtended = {
    iid: string,
    title: string,
    description: string,
    uploaded: number,
    changed: number,
    uploadedBy: TUser,
    ratings: TRating[],
    views: number,
    comments: TComment[]
}

declare type TDeleteDTO = {
    id: string;
};

declare type TComment = {
    cid: string;
    iid: string;
    user: TUser;
    date: number;
    text: string;
};
