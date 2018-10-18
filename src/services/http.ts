import {IResponseContainer} from 'src/types';

// superagent does not ant to work with parcel :(

export interface IHttp  {
    get<T>(url: string): Promise<T>;
}

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class Http implements IHttp {
    createRequest<T>(method: THttpMethod, url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.addEventListener('load', () => {
                try {
                    const response = JSON.parse(request.responseText) as IResponseContainer<T>;
                    return response.status === 200
                        ? resolve(response.payload)
                        : reject({ message: response.error });
                } catch (err) {
                    reject(err);
                }
            });
            request.addEventListener('error', err => {
                console.log(err, request);
                reject(err);
            });
            request.addEventListener('abort', () => {
                console.log(request);
                reject({ message: 'Aborted' });
            });

            request.open(method, url);
            request.send();
        });
    }

    get<T>(url: string): Promise<T> {
        return this.createRequest<T>('GET', url);
    }
}
