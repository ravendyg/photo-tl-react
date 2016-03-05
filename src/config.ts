/// <reference path="../typings/tsd.d.ts" />

export = function (query): string {
    switch (query) {
        case `url`:
            return `http://192.168.1.157`;
        case `port`:
            return `:8085`; 
        case 'userDriver':
            return '/user-processor';
        case 'imageDriver':
            return '/image-processor';
    }
}