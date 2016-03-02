/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

// view components
import {TodoApp} from './components/TodoApp.tsx';

// initialization
ReactDom.render(
    <TodoApp />,
    document.getElementById(`root`)
);


