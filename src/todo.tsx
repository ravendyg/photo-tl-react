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
import {TodoApp} from './components/TodoApp.tsx';

// // initialization
// ReactDom.render(
//     <TodoApp />,
//     document.getElementById(`root`)
// );

class App extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <h1>App</h1>
            {/* change the <a>s to <Link>s */}
            <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            </ul>

            {/*
            next we replace `<Child>` with `this.props.children`
            the router will figure out the children for us
            */}
            {this.props.children}
        </div>
        )
    }
}

class About extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            About
            <Link to="/">Home</Link>
        </div>
        )
    }
}

class Inbox extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            Inbox
            <Link to="/">Home</Link>
        </div>
        )
    }
}

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: TodoApp },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox },
  ]
}

ReactDom.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById(`root`)
);
