import * as React from 'react';
import {render} from 'react-dom';
import {createStore} from './store/store';
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
const store = createStore({userStore, webSocketService, photoService, commonStore});
const userActions = new UserActions(userService, userStore, commonStore)
const deps: IDeps = {
    userActions,
    userStore,
};

render(
    <App store={store} deps={deps}/>,
    document.getElementById('root'),
);
