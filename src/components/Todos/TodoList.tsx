/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
import {ListeningComponent} from './../listening-component.ts';

const List = vendor.mUi.List;
const ListItem = vendor.mUi.ListItem;

const AlarmIcon = require('./../../svg/svg.tsx').AlarmIcon;
const DoneIcon = require('./../../svg/svg.tsx').DoneIcon;

const Colors = vendor.mUi.Colors;

console.log(Colors);

// const 
const actionCreators: IActionCreators = require('./../../action-creators.ts').actionCreators;

// data
const store: IStore = require('./../../store.ts');
const filters: Filters = require('./../../consts.ts').Filters;

const getVisibleTodos = (todos: TodoType [], filter) => {
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


export class TodoList extends ListeningComponent {
    protected needToReRender: any;
    
    constructor () { super(store); }
    
    protected trackRenderDependecies () {
        this.needToReRender = {
            todos: store.getState().todos,
            visibilityFilter: store.getState().visibilityFilter
        };
    }

    
    public render () {
console.log(`render todo`);
        super.render();
        
        const _todos = getVisibleTodos(
            store.getState().todos,
            store.getState().visibilityFilter
        );
        
        return (
            <List>
                {_todos.map(todo => 
                    <ListItem
                        leftIcon={
                            todo.completed ? <DoneIcon color={Colors.green500}/> : <AlarmIcon /> 
                        }
                        key={todo.id}
                        onClick={() => {
                            store.dispatch(actionCreators.toggleTodo(todo.id));
                        }}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}>
                        {todo.text}
                    </ListItem>
                )}
            </List>
        );
    }
}