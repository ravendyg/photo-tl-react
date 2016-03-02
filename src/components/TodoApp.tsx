/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../store.ts');


// let nextTodo = 0;

export class TodoApp extends React.Component {
    constructor () {
        super();        
    }
    
    render () {
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
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
                    {store.getState().todos.map(todo => 
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}