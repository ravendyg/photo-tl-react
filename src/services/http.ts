import {IResponseContainer} from '../types';

// superagent does not ant to work with parcel :(

export interface IHttp  {
    get<T>(url: string): Promise<IResponseContainer<T>>;

    post<T>(url: string, body?: Object): Promise<IResponseContainer<T>>;

    delete(url: string): Promise<IResponseContainer<void>>;
}

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class Http implements IHttp {
    createRequest<T>(method: THttpMethod, url: string, body?: Object)
        : Promise<IResponseContainer<T>> {
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
            if (Boolean(body)) {
                request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                request.send(JSON.stringify(body));
            } else {
                request.send();
            }
        });
    }

    get<T>(url: string) {
        return this.createRequest<T>('GET', url);
    }

    post<T>(url: string, body?: Object) {
        return this.createRequest<T>('POST', url, body);
    }

    delete(url: string) {
        return this.createRequest<void>('DELETE', url);
    }
}
