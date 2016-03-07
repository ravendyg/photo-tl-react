declare type UserType = {
    name: string,
    pas?: string,
    pas2?: string,
    rem?: boolean,
    then?: any
}

declare type dialogsType = {
    in: boolean,
    up: boolean
}

declare type StateType = {
    user: UserType,
    dialogs: dialogsType,
    photos: ImageType [],
};

declare type ActionType = {
    type: number;
    payload?: {
        id?: string,
        filter?: number,
        name?: string,
        text?: string,
        user?: UserType,
        photo?: ImageType,
        photos?: ImageType [],
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
declare type CommentType = {
    userName: string,
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