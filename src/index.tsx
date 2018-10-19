import * as React from 'react';
import {render} from 'react-dom';
import {createStore} from './store/store';
import {UserService} from './services/UserService';
import {Http} from './services/http';
import {createConfig} from './getConfig';
import {App} from './App';

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
const userService = new UserService(http, config);
const store = createStore({userService});

render(
    <App store={store}/>,
    document.getElementById('root'),
);
