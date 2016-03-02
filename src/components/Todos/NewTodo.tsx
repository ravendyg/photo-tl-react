/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');
const actions: Actions = require('./../../consts.ts').Actions;

const onAddClick = (input: HTMLInputElement) => {
    store.dispatch({
        type: actions.ADD_TODO,
        payload: {
            text: input.value,
            id: store.getState().nextTodo
        }
    })
    input.value = '';
};

export class NewTodo extends React.Component {
    constructor () { super(); }
    
    render () {
        let input: HTMLInputElement = this.input;
        
        return (
            <div>
                <input ref={node => {
                    input = node;
                }} />
                <button onClick={() => {
                    onAddClick(input)
                }}>
                    Add Todo
                </button>
            </div>
        );
    }
}