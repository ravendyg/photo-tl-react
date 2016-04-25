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

import {LoginDialog} from './components/dialogs/login.tsx';

var css = require("./style.css");

var username = ``;

// check for username in body
// if -> dispatch
var dataset: {user?: string} = document.body.dataset;
if (dataset.user) {
    Store.dispatch(ActionCreators.signInUser({name: dataset.user}));
    username = Store.getState().user.name;
    SocketService.connect();
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
    if (!Store.getState().user.name) {
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
    if (Store.getState().user.name && Store.getState().user.name !== username) {
        // logged in
        location.hash = `loggedin/all-photos`
    } else if (!Store.getState().user.name && username) {
        // logged out
        location.hash = `no-user`
    }
    username = Store.getState().user.name;
})

