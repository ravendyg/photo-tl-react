let serverType = '/node';
const baseUrl = window.location.origin;
const port = '';

export function setServer(type) {
    switch (type) {
        case 'java': {
            serverType = '/java';
            break;
        }
    }
}

export function getApiUrl(suffix) {
    return baseUrl + port + serverType + suffix;
}

export function configQuery(query) {
    switch (query) {
        case `url`:
            return window.location.origin;//`http://excur.info`;
        case `port`:
            return '';//`:8085`;
        case 'imageDriver':
            return `/${serverType}/image-processor`;
    }
}
