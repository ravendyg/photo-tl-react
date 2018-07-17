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

declare type dialogsType = {
    in: boolean,
    up: boolean,
    upload: boolean,
    editPhoto: string,
}

declare type StateType = {
    user: TUser,
    dialogs: dialogsType,
    photos: ImageType [],
};

declare type ActionType = {
    type: string;
    payload?: {
        id?: string,
        filter?: number,
        name?: string,
        text?: string,
        user?: TUser,
        photo?: ImageType,
        photos?: ImageType [],
        newRating?: RatingType,
        newComment?: {
            comment: CommentType,
            id: string
        },
        date?: string,
        dataChange?: ImageType,
    };
};

declare type AjaType = () => IAja;

declare type RatingType = {
    rid: string,
    date: number,
    user: string,
    image: string,
    value: number
}


declare type CommentType = {
    cid: string,
    user: string,
    text: string,
    date: number
}

declare type ImageType = {
    iid: string,
    title: string,
    description: string,
    uploaded: number,
    changed: number,
    uploadedBy: TUser,
    ratings: RatingType[],
    views: number,
    comments: CommentType[]
}

declare type DeleteDTO = {
    id: string;
};
