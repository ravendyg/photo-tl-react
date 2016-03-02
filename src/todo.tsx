/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

// data
const store: IStore = require('./store.ts');

// view components
import {TodoApp} from './components/TodoApp.tsx';

// view
const render = () => {
    ReactDom.render(
        <TodoApp />,
        document.getElementById(`root`)
    );
};

// initialization
store.subscribe(render);
render();





