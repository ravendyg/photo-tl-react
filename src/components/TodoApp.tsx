/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../store.ts');


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
                {store.getState().todos.map(todo => 
                    <li key={todo.id}>
                        {todo.text}
                    </li>
                )}
            </div>
        );
    }
}