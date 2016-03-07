/// <reference path="./../../typings/interfaces.d.ts" />

const aja: AjaType = vendor.aja;
const config: (query: any) => string = require('./../config.ts');

const actionCreators: IActionCreators = require('./../action-creators.ts').actionCreators;
const store: IStore = require('./../store.ts');
// const socket = require('./socket-service.ts').SocketService;

class ImageServiceClass implements IImageService {
    // private _http: any;
    private _aja: AjaType;
    // private _q: any;
    // private _timeout: any;
    private _loggedInUser: any;
    
    private _store: IStore;
    
    private _images: ImageType [];
    // flag to prevent repetitive photos loading
    private _loadedImages: boolean;
    
    constructor (aja, store, actionCreators) {
        // this._http = $http;
        this._aja = aja;
        // this._q = $q;
        // this._timeout = $timeout;
        
        this._store = store;
        this._images = this._store.getState().photos;
        this._loadedImages = false;
        // download photos if signedin
        if (this._store.getState().user.name) {
            this._getImageData();
        }
        
        this._store.subscribe(() => {
            if (this._store.getState().user.name && !this._loadedImages) {
                // if just logged in
                this._getImageData();
            }
        });
        
        // var getImageData = () => this.getImageData();
    }
    
    private _getImageData (): void {
        // real call to the server
        this._aja()
                .method(`GET`)
                .url(config('url') + config('port') + config('imageDriver') + '/all-images')
                .on(`200`, resp => {
                    console.log(resp);
                    this._loadedImages = true;
                    this._store.dispatch(actionCreators.addPhotos(resp));
                    // store.dispatch(actionCreators.signInUser(user));
                    // this._socketService.connect(config('url') + config('port'));
                    // resolve();
                })
                .on('40x', err => {
                    console.log(err);
                    // reject(JSON.parse(err).error);
                })
                .on(`50x`, err => {
                    console.log(err);
                    // reject(JSON.parse(err).error);
                })
                .go();   
    }
    
    public uploadPhoto (file: HTMLInputElement): void {
    //     // promise for controller
    //     var deferred = this._q.defer();
        
    //     // ajax
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', config('url') + config('port') + config('imageDriver') + '/upload-image');
        
    //     xhr.onload = function () {
    //         deferred.resolve(JSON.parse(xhr.responseText).filename);
    //     };
        
    //     xhr.onreadystatechange = function() {
    //         console.log(xhr.status);
    //     };
        
    //     xhr.onerror = function (err) {
    //         console.error(err);
    //         deferred.reject();
    //     };
        
    //     xhr.upload.onprogress = function (e) {
    //         console.log(e.total);
    //         console.log(e.loaded / e.total);
    //     };
        
    //     xhr.send(file);
        
    //     return deferred.promise;
    }

}

export const ImageService = new ImageServiceClass(aja, store, actionCreators);