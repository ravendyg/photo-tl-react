import {IResponseContainer} from '../types';

// superagent does not want to work with parcel :(

export interface IHttpHeaders {
    headers?: {
        [key: string]: string;
    };
}

export interface IHttpInfo extends IHttpHeaders {
    body?: any;
}

export interface IHttp  {
    get<T>(url: string, headers?: IHttpHeaders): Promise<IResponseContainer<T | null>>;

    post<T>(url: string, info?: IHttpInfo): Promise<IResponseContainer<T | null>>;

    patch<T>(url: string, info?: IHttpInfo): Promise<IResponseContainer<T | null>>;

    delete(url: string, headers?: IHttpHeaders): Promise<IResponseContainer<null>>;
}

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class Http implements IHttp {
    createRequest<T>(method: THttpMethod, url: string, info: IHttpInfo = {})
        : Promise<IResponseContainer<T | null>> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.addEventListener('load', () => {
                if (request.status !== 200) {
                    return resolve({
                        status: request.status,
                        error: request.statusText,
                        payload: null,
                    });
                }
                try {
                    const response = JSON.parse(request.responseText) as IResponseContainer<T>;
                    return resolve(response);
                } catch (err) {
                    return resolve({
                        error: err.message,
                        status: -1,
                        payload: null,
                    });
                }
            });
            request.addEventListener('error', err => {
                return reject({
                    message: 'Smth went wrong',
                });
            });
            request.addEventListener('abort', () => {
                return resolve({
                    error: 'Aborted',
                    status: -1,
                    payload: null,
                });
            });

            request.open(method, url);
            const {
                body,
                headers = {},
            } = info;
            Object.keys(headers).forEach(key => {
                request.setRequestHeader(key, headers[key]);
            });
            if (Boolean(body)) {
                if (body && body.constructor && body.constructor.name === 'ArrayBuffer') {
                    if (headers.type) {
                        request.setRequestHeader('Content-Type', `${headers.type};charset=UTF-8`);
                        request.send(body);
                    }
                } else {
                    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                    request.send(JSON.stringify(body));
                }
            } else {
                request.send();
            }
        });
    }

    get<T>(url: string, info?: IHttpHeaders) {
        return this.createRequest<T>('GET', url, info);
    }

    post<T>(url: string, info?: IHttpInfo) {
        return this.createRequest<T>('POST', url, info);
    }

    patch<T>(url: string, info?: IHttpInfo) {
        return this.createRequest<T>('PATCH', url, info);
    }

    delete(url: string, info?: IHttpHeaders) {
        return this.createRequest<null>('DELETE', url, info);
    }
}
