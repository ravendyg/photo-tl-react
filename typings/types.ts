export declare type TUserRequest = {
    name: string,
    pas: string,
    pas2?: string,
    rem: boolean,
}

export declare type TUser = {
    uid: string,
    name: string,
}

export declare type TDialog = {
    in: boolean,
    up: boolean,
    upload: boolean,
    editPhoto: string,
}

export declare type TState = {
    user: TUser,
    dialogs: TDialog,
    photos: TImage[],
};

export declare type TAction = {
    type: string;
    payload?: {
        id?: string,
        filter?: number,
        name?: string,
        text?: string,
        user?: TUser,
        photo?: TImage,
        photos?: TImage [],
        newRating?: TRating,
        newComment?: TComment,
        deletedComment?: TComment,
        date?: string,
        dataChange?: TImage,
    };
};

export declare type TRating = {
    rid: string,
    date: number,
    user: string,
    image: string,
    value: number
}

export declare type TImage = {
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

export declare type TDeleteDTO = {
    id: string;
};

export declare type TComment = {
    cid: string;
    iid: string;
    user: TUser;
    date: number;
    text: string;
};
