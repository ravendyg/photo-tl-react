/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

var Router = vendor.ReactRouter.Router
var Route = vendor.ReactRouter.Route
var Link = vendor.ReactRouter.Link

var hashHistory = vendor.ReactRouter.hashHistory;

import {Store} from './store.ts';

import {ActionCreators} from './action-creators.ts';

import {SocketService} from './server-apis/socket-service.ts';

// view components
import {NoUser} from './components/no-user.tsx';


import {AllPhotos} from './components/loggedin/all-photos.tsx';
import {MyPhotos} from './components/loggedin/my-photos.tsx';
import {UserData} from './components/loggedin/user-data.tsx';

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

class App extends React.Component {
    constructor () { super(); }

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
ReactDom.render(
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

