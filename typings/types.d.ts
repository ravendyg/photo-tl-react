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
        _id?: string,
        filter?: number,
        name?: string,
        text?: string,
        user?: TUser,
        photo?: ImageType,
        photos?: ImageType [],
        newRating?: NewRatingType,
        newComment?: {
            comment: CommentType,
            id: string
        },
        date?: string,
        dataChange?: DataChangeType,
    };
};

declare type AjaType = () => IAja;

declare type RatingType = {
    user: string,
    val: number
}

declare type AverageRatingType = {
    count: number,
    val: number
}

declare type NewRatingType = {
    _id: string,
    averageRating: AverageRatingType,
    ratingElem: RatingType
}

declare type CommentType = {
    user: string,
    text: string,
    date: string
}

declare type ImageType = {
    iid: string,
    title: string,
    description: string,
    uploaded: string,
    changed: string,
    uploadedBy: TUser,
    changedBy: TUser,
    averageRating: AverageRatingType,
    rating: RatingType [],
    views: number,
    comments: CommentType []
}

declare type DataChangeType = {
    _id: string,
    title: string,
    text: string,
    time: string,
    user: TUser
}
