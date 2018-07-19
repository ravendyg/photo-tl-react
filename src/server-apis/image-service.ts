import { IImageExtended } from '../../typings/types';
import {
    IActionCreators,
    IImageService,
    IPromise
} from '../../typings/interfaces';

import * as aja from 'aja';
const config: (query: any) => string = require('./../config.ts');

const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
const store = require('./../store.ts').Store;
// const socket = require('./socket-service.ts').SocketService;

class ImageServiceClass implements IImageService {
    // private _http: any;

    // private _q: any;
    // private _timeout: any;
    private _loggedInUser: any;

    private _images: IImageExtended [];
    // flag to prevent repetitive photos loading
    private _loadedImages: boolean;

    constructor () {

        this._images = store.getState().photos;
        this._loadedImages = false;
        // download photos if signedin
        if (store.getState().user) {
            this._geIImageExtendedData();
        }

        store.subscribe(() => {
            if (store.getState().user && !this._loadedImages) {
                // if just logged in
                this._geIImageExtendedData();
            }
        });

        // var geIImageExtendedData = () => this.geIImageExtendedData();
    }

    private _geIImageExtendedData (): void {
        // real call to the server
        aja()
            .method(`GET`)
            .url(config('url') + config('port') + config('imageDriver') + '/all-images')
            .on(`200`, resp => {
                this._loadedImages = true;
                store.dispatch(actionCreators.addPhotos(resp || []));
            })
            .on('40x', console.error)
            .on(`50x`, console.error)
            .go();
    }

    public uploadPhoto (photo: any): IPromise {
        return new Promise ( (resolve, reject) => {
            // ajax
            var xhr = new XMLHttpRequest();
            xhr.open('POST', config('url') + config('port') + config('imageDriver') + '/upload-image');

            xhr.onload = function (resp) {
                resolve(JSON.parse(xhr.responseText).iid);
            };

            xhr.onerror = function (err) {
                reject(err);
            };

            xhr.upload.onprogress = function (e) {
                console.log(e.total);
                console.log(e.loaded / e.total);
            };

            xhr.send(photo);
        });
    }

}

export const ImageService = new ImageServiceClass();
