import * as React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';

import {Store} from './store';
import {ActionCreators} from './action-creators';
import {SocketService} from './server-apis/socket-service';

import {NoUser} from './components/no-user';
import {AllPhotos} from './components/loggedin/all-photos';
import {MyPhotos} from './components/loggedin/my-photos';
import {UserData} from './components/loggedin/user-data';

import {setServer} from './config';


location.search
    .replace('?', '')
    .split('&')
    .map(item => item.split('='))
    .forEach(([key, val]) => {
        if (key === 's') {
            setServer(val);
        }
    });
var css = require("./style.css");

var username = ``;

// check for username in body
// if -> dispatch
var dataset: {userName?: string, userUid?: string} = document.body.dataset;
const { userName, userUid } = dataset;
if (userName && userUid) {
    try {
        const user = {name: userName, uid: userUid};
        Store.dispatch(ActionCreators.signInUser(user));
        SocketService.connect();
    } catch (e) {}
}

class App extends React.Component<{}, {}> {
    render () {
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

const redir = (nextState, replace) => {
    const {user} = Store.getState();
    if (!user) {
        // logged out
        replace('/no-user');
    } else if (nextState.location.pathname === `/no-user`) {
        // logged in
        replace('loggedin/all-photos');
    } else if (nextState.location.pathname === `/`) {
        // no index
        replace('loggedin/all-photos');
    }
    // else do nothing
};

const routes = {
    path: '/', component: App,
    indexRoute: {onEnter: redir },
    childRoutes: [
        { path: 'no-user', component: NoUser },
        { path: 'loggedin/all-photos', component: AllPhotos, data: 1, onEnter: redir },
        { path: 'loggedin/my-photos', component: MyPhotos, onEnter: redir },
        { path: 'loggedin/user-data', component: UserData, onEnter: redir },
        { path: '*', onEnter: (nextState, replace) => {
                    replace('/');
                }
        },
    ]
}

// render
render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById(`root`)
);

// if user changed rerender
Store.subscribe(() => {
    const {user} = Store.getState();
    if (!user) {
        location.hash = `no-user`;
        username = '';
    } else if (user.name !== username) {
        // logged in
        username = user.name;
        location.hash = `loggedin/all-photos`
    }
});

