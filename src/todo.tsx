/// <reference path="../typings/tsd.d.ts" />

const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

// data
import {store} from './store.ts';

// view components
import {TodoApp} from './components/TodoApp.tsx';

// view
const render = () => {
    ReactDom.render(
        <TodoApp
            store={store}
            todos={store.getState().todos}
        />,
        document.getElementById(`root`)
    );
};

// initialization
store.subscribe(render);
render();





