/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

var Router = vendor.ReactRouter.Router
var Route = vendor.ReactRouter.Route
var Link = vendor.ReactRouter.Link

var hashHistory = vendor.ReactRouter.hashHistory;

const store: IStore = require('./store.ts');
const actionCreators: IActionCreators = require('./action-creators.ts').actionCreators;

// view components
import {AppToolbar} from './components/toolbar/toolbar.tsx';
import {NoUser} from './components/no-user.tsx';
import {AllPhotos} from './components/loggedin/all-photos.tsx';
import {MyPhotos} from './components/loggedin/my-photos.tsx';
import {UserData} from './components/loggedin/user-data.tsx';

import {LoginDialog} from './components/dialogs/login.tsx';

var username = ``;

class App extends React.Component {
    constructor(){ super();}
    
    render() {
        // don't display no-user if user is signedin
        if (store.getState().user.name) {
            if (location.hash.match(/#\/?/)) {
                return (
                <div>
                    <AppToolbar />
                    <AllPhotos />
                    <LoginDialog name={'login'}/>
                </div>
                )    
            }
        } else {
            return (
            <div>
                <AppToolbar />
                {this.props.children}
                <LoginDialog name={'login'}/>
            </div>
            )
        }
    }
}


const routes = {
    path: '/', component: App, indexRoute: {component: NoUser}, 
    childRoutes: [
        { path: 'loggedin/all-photos', component: AllPhotos },
        { path: 'loggedin/my-photos', component: MyPhotos },
        { path: 'loggedin/user-data', component: UserData },
        { path: '*', onEnter: (nextState, replace) => {
                replace('loggedin/all-photos');
                }
        },
    ]
}


ReactDom.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById(`root`)
);

// if user changed rerender
store.subscribe(() => {
    if (store.getState().user.name && store.getState().user.name !== username) {
        ReactDom.render(
            <Router history={hashHistory} routes={routes} />,
            document.getElementById(`root`)
        );
    }
    username = store.getState().user.name;
})

// check for username in body
// if -> dispatch
var dataset: {user?: string} = document.body.dataset;
if (dataset.user) {
    store.dispatch(actionCreators.signInUser({name: dataset.user}));
}