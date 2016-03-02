/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../store.ts');
const actions: Actions = require('./../consts.ts').Actions;
const filters: Filters = require('./../consts.ts').Filters;

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

export class TodoList extends React.Component {
    constructor () {
        super();    
    }
    
    render () {
        const _todos = getVisibleTodos(
            store.getState().todos,
            store.getState().visibilityFilter
        );
        
        return (
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
        );
    }
}