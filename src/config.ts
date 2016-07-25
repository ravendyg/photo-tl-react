/// <reference path="../typings/tsd.d.ts" />

export = function (query): string {
    switch (query) {
        case `url`:
            return window.location.origin;//`http://excur.info`;
        case `port`:
            return '';//`:8085`;
        case 'userDriver':
            return '/user-processor';
        case 'imageDriver':
            return '/image-processor';
    }
}