declare type UserType = {
    name: string,
    pas?: string,
    pas2?: string,
    rem?: boolean,
    then?: any
}

declare type dialogsType = {
    in: boolean,
    up: boolean,
    upload: boolean,
    editPhoto: string,
}

declare type StateType = {
    user: UserType,
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
        user?: UserType,
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
    _id: string,
    src: string,
    title: string,
    description: string,
    uploaded: string,
    changed: string,
    uploadedBy: string,
    changedBy: string,
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
    user: string
}
