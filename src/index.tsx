import * as React from 'react';
import { render } from 'react-dom';
import { PhotoStore } from './store/photoStore';
import { CommentStore } from './store/commentStore';
import { UserService } from './services/UserService';
import { UserStore } from './store/userStore';
import { CommonStore } from './store/commonStore';
import { Http } from './services/Http';
import { WebSocketService } from './services/WebSocketService'
import { createConfig } from './getConfig';
import { App } from './App';
import { PhotoService } from './services/PhotoService';
import { CommentService } from './services/CommentService';
import { UserActions } from './actions/UserActions';
import { AuthService } from './services/AuthService';
import { IDeps } from './types';
import { PhotoActions } from './actions/PhotoActions';
import { ConnectionStore } from './store/connectionStore';
import { ConnectionActions } from './actions/ConnectionActions';
import { CommonActions } from './actions/CommonActions';
import { CommentActions } from './actions/CommentActions';

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
const userStore = new UserStore();
const authService = new AuthService(localStorage, userStore);
const photoService = new PhotoService(http, config, authService);
const commentService = new CommentService(http, config, authService);
const userService = new UserService(authService, http, config);
const webSocketService = new WebSocketService(config.apiUrl, http);

const commonStore = new CommonStore();
const photoStore = new PhotoStore();
const connectionStore = new ConnectionStore();
const commentStore = new CommentStore();

const connectionActions = new ConnectionActions(
    connectionStore,
    webSocketService,
);
const commentActions = new CommentActions(
    commentStore,
    commonStore,
    commentService,
    connectionActions,
    photoStore,
);
const commonActions = new CommonActions(commonStore);
const photoActions = new PhotoActions(
    connectionActions,
    commonStore,
    photoStore,
    photoService,
    userStore,
);
const userActions = new UserActions(
    commonStore,
    connectionActions,
    userService,
    userStore,
    authService,
);

const deps: IDeps = {
    commonActions,
    commonStore,
    connectionStore,
    photoActions,
    photoStore,
    commentActions,
    commentStore,
    userActions,
    userStore,
};

render(
    <App deps={deps} />,
    document.getElementById('root'),
);
