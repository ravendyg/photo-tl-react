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
import { IDeps } from './types';
import { PhotoActions } from './actions/PhotoActions';
import { ConnectionStore } from './store/connectionStore';
import { ConnectionActions } from './actions/ConnectionActions';
import { CommonActions } from './actions/CommonActions';

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
const commentService = new CommentService(http, config);
const userService = new UserService(http, config);
const webSocketService = new WebSocketService(config.apiUrl, http);

const userStore = new UserStore();
const commonStore = new CommonStore();
const photoStore = new PhotoStore(photoService);
const connectionStore = new ConnectionStore();
const commentStore = new CommentStore(commentService);

const commonActions = new CommonActions(commonStore);
const connectionActions = new ConnectionActions(
    connectionStore,
    webSocketService,
);
const photoActions = new PhotoActions(
    connectionActions,
    commonStore,
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
