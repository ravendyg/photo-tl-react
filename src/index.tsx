import * as React from 'react';
import {render} from 'react-dom';
import {PhotoStore} from './store/photoStore';
import {UserService} from './services/UserService';
import {UserStore} from './store/userStore';
import {CommonStore} from './store/commonStore';
import {Http} from './services/Http';
import {WebSocketService} from './services/WebSocketService'
import {createConfig} from './getConfig';
import {App} from './App';
import {PhotoService} from './services/PhotoService';
import {UserActions} from './actions/UserActions';
import {IDeps} from './types';
import {PhotoActions} from './actions/PhotoActions';
import {ConnectionStore} from './store/connectionStore';
import {ConnectionActions} from './actions/ConnectionActions';

let serverType: string = '';
location.search
    .replace('?', '')
    .split('&')
    .map(item => item.split('='))
    .forEach(([key, val]) => {
        if (key === 's') {
            serverType = val;
        }
    });

const config = createConfig(serverType);
const http = new Http();
const photoService = new PhotoService(http, config);
const userService = new UserService(http, config);
const webSocketService = new WebSocketService(config.apiUrl, http);

const userStore = new UserStore();
const commonStore = new CommonStore();
const photoStore = new PhotoStore(photoService);
const connectionStore = new ConnectionStore();

const connectionActions = new ConnectionActions(
    connectionStore,
    webSocketService,
);
const photoActions = new PhotoActions(
    commonStore,
    connectionActions,
    photoStore,
    photoService,
);
const userActions = new UserActions(
    commonStore,
    connectionActions,
    userService,
    userStore,
);

const deps: IDeps = {
    commonStore,
    connectionStore,
    photoActions,
    photoStore,
    userActions,
    userStore,
};

render(
    <App deps={deps}/>,
    document.getElementById('root'),
);
