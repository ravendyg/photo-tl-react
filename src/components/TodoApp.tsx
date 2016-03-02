/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../store.ts');
const actions: Actions = require('./../consts.ts').Actions;
const filters: Filters = require('./../consts.ts').Filters;

import {FilterLink} from './FilterLink.tsx';
import {TodoList} from './TodoList.tsx';

const filterLinkNames = [`All`, `Active`, `Completed`];

// let nextTodo = 0;

export class TodoApp extends React.Component {    
    constructor () {
        super();        
    }
    
    render () {
        
        const q = store.getState().todos;
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: actions.ADD_TODO,
                        payload: {
                            text: this.input.value,
                            id: store.getState().nextTodo
                        }
                    });
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <TodoList todos={q}/>
                <p>
                    Show:
                    {filterLinkNames.map((mode, index) => {
                        if (store.getState().visibilityFilter !== index) { return (
                            <FilterLink
                                key={index}
                                filter={index}
                                children={mode}
                            />
                        )} else { return (
                            <span>
                                {` ${mode}`}
                            </span>
                        )}
                    })}   
                </p>                    
            </div>
        );
    }
}

                    // <FilterLink
                    //     filter={filters.SHOW_ALL}
                    //     children={'All'}
                    // />
                    // {' '}
                    // <FilterLink
                    //     filter={filters.SHOW_ACTIVE}
                    //     children={'Active'}
                    // />
                    // {' '}
                    // <FilterLink
                    //     filter={filters.SHOW_COMPLETED}
                    //     children={'Completed'}
                    // />