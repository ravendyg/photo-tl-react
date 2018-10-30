import {IConfig} from './types';

const baseUrl = window.location.origin;
const port = '';

export function createConfig(serverType: string): IConfig {
    let serverPathChunk = '/node';

    switch (serverType) {
        case 'java': {
            serverPathChunk = '/java';
            break;
        }
    }

    return {
        apiUrl: baseUrl + port + serverPathChunk,
    };
}
