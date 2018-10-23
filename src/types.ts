export interface IUser {
    uid: string;
    name: string;
}

export interface IResponseContainer<T> {
    error: string;
    payload: T;
    status: number;
}

export interface IConfig {
    apiUrl: string;
}

export interface ISignArgs {
    login: string;
    pas: string;
}

export interface IPhoto {
    iid: string;
    description: string;
    title: string;
    uploadedBy: IUser;
    uploaded: number;
    changed: number;
}
