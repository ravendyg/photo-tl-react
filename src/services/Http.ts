import {IResponseContainer} from '../types';

// superagent does not want to work with parcel :(

type TCreateRequest = (method: THttpMethod, url: string, info?: IHttpInfo) => Promise<IResponseContainer<any>>;

export interface IHttpHeaders {
    headers?: {
        [key: string]: string;
    };
}

export interface IHttpInfo extends IHttpHeaders {
    body?: any;
}

export interface IHttp  {
    get(url: string, headers?: IHttpHeaders): Promise<IResponseContainer<any>>;

    post(url: string, info?: IHttpInfo): Promise<IResponseContainer<any>>;

    patch(url: string, info?: IHttpInfo): Promise<IResponseContainer<any>>;

    delete(url: string, headers?: IHttpHeaders): Promise<IResponseContainer<null>>;
}

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class Http implements IHttp {
    createRequest: TCreateRequest =
        (method: THttpMethod, url: string, info: IHttpInfo = {}) => {
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
                    const response = JSON.parse(request.responseText) as IResponseContainer<any>;
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
                } else if (typeof body === 'object') {
                    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                    request.send(JSON.stringify(body));
                } else {
                    request.send(body);
                }
            } else {
                request.send();
            }
        });
    };

    get = (url: string, info?: IHttpHeaders) =>
        this.createRequest('GET', url, info);

    post = (url: string, info?: IHttpInfo) =>
        this.createRequest('POST', url, info);

    patch = (url: string, info?: IHttpInfo) =>
        this.createRequest('PATCH', url, info);

    delete = (url: string, info?: IHttpHeaders) =>
        this.createRequest('DELETE', url, info);
}
