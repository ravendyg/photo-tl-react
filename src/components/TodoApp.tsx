/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../store.ts');
const actions: Actions = require('./../consts.ts').Actions;
const filters: Filters = require('./../consts.ts').Filters;

import {NewTodo} from './Todos/NewTodo.tsx';
import {TodoList} from './Todos/TodoList.tsx';
import {FilterLinks} from './FilterLinks/FilterLinks.tsx';

export class TodoApp extends React.Component {    
    constructor () {
        super();        
    }
    
    render () {
        
        const q = store.getState().todos;
        return (
            <div>
                <NewTodo />
                <TodoList />
                <FilterLinks />                   
            </div>
        );
    }
}