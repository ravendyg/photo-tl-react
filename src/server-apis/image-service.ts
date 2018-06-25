/// <reference path="./../../typings/interfaces.d.ts" />

const aja: AjaType = vendor.aja;
const config: (query: any) => string = require('./../config.ts');

const actionCreators: IActionCreators = require('./../action-creators.ts').ActionCreators;
const store = require('./../store.ts').Store;
// const socket = require('./socket-service.ts').SocketService;

class ImageServiceClass implements IImageService {
    // private _http: any;

    // private _q: any;
    // private _timeout: any;
    private _loggedInUser: any;

    private _images: ImageType [];
    // flag to prevent repetitive photos loading
    private _loadedImages: boolean;

    constructor () {

        this._images = store.getState().photos;
        this._loadedImages = false;
        // download photos if signedin
        if (store.getState().user.name) {
            this._getImageData();
        }

        store.subscribe(() => {
            if (store.getState().user.name && !this._loadedImages) {
                // if just logged in
                this._getImageData();
            }
        });

        // var getImageData = () => this.getImageData();
    }

    private _getImageData (): void {
        // real call to the server
        aja()
            .method(`GET`)
            .url(config('url') + config('port') + config('imageDriver') + '/all-images')
            .on(`200`, resp => {
                this._loadedImages = true;
                store.dispatch(actionCreators.addPhotos(resp || []));
            })
            .on('40x', err => {
                console.log(err);
            })
            .on(`50x`, err => {
                console.log(err);
            })
            .go();
    }

    public uploadPhoto (photo: any): IPromise {
        var promise = new Promise ( (resolve, reject) => {
            // ajax
            var xhr = new XMLHttpRequest();
            xhr.open('POST', config('url') + config('port') + config('imageDriver') + '/upload-image');

            xhr.onload = function (resp) {
                resolve(JSON.parse(xhr.responseText).filename);
            };

            xhr.onreadystatechange = function() {
                console.log(xhr.status);
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
        return promise;
    }

}

export const ImageService = new ImageServiceClass();
