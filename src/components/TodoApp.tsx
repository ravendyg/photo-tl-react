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

const getVisibleTodos = (todos: ITodo [], filter) => {
    switch (filter) {
        
        case filters.SHOW_ALL:
            return todos;
            
        case filters.SHOW_COMPLETED:
            return todos.filter(t=>t.completed);
            
        case filters.SHOW_ACTIVE:
            return todos.filter(t=>!t.completed);
    
        default:
            return todos;
    }
}

export class TodoApp extends React.Component {    
    constructor () {
        super();        
    }
    
    render () {
        const _todos = getVisibleTodos(
            store.getState().todos,
            store.getState().visibilityFilter
        );
        
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
                <ul>
                    {_todos.map(todo => 
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: actions.TOGGLE_TODO,
                                    payload: {
                                        id: todo.id
                                    }
                                });
                            }}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:
                    {filterLinkNames.map((mode, index) => 
                        <FilterLink
                            key={index}
                            filter={index}
                            children={mode}
                        />
                    )}   
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