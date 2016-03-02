/// <reference path="../../typings/tsd.d.ts" />

import {store} from './../store.ts';

const React: IReact = vendor.React;

let nextTodo = 0;

export class TodoApp extends React.Component {
    constructor () {
        super();        
    }
    
    render () {
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        payload: {
                            text: 'test',
                            id: nextTodo++
                        }
                    });
                }}>
                    Add Todo
                </button>
                {this.props.todos.map(todo => 
                    <li key={todo.id}>
                        {todo.text}
                    </li>
                )}
            </div>
        );
    }
}