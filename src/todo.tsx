/// <reference path="../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

const store: IStore = require('./store.ts');

// view components
import {Provider} from './components/Provider.tsx';
import {TodoApp} from './components/TodoApp.tsx';

// initialization
ReactDom.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById(`root`)
);



