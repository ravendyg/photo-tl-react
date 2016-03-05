/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

var Router = vendor.ReactRouter.Router
var Route = vendor.ReactRouter.Route
var Link = vendor.ReactRouter.Link

var hashHistory = vendor.ReactRouter.hashHistory;

const store: IStore = require('./store.ts');

// view components
import {AppToolbar} from './components/toolbar/toolbar.tsx';
import {NoUser} from './components/no-user.tsx';
import {AllPhotos} from './components/loggedin/all-photos.tsx';
import {MyPhotos} from './components/loggedin/my-photos.tsx';
import {UserData} from './components/loggedin/user-data.tsx';



class App extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <AppToolbar />
            {this.props.children}
        </div>
        )
    }
}


const routes = {
  path: '/', component: App, indexRoute: {component: NoUser},  
  childRoutes: [
    { path: 'loggedin/all-photos', component: AllPhotos },
    { path: 'loggedin/my-photos', component: MyPhotos },
    { path: 'loggedin/user-data', component: UserData },
    { path: '*', onEnter: function (nextState, replace) {
              replace('loggedin/all-photos');
            }
    },
  ]
}


ReactDom.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById(`root`)
);
