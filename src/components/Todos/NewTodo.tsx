/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');
const actions: Actions = require('./../../consts.ts').Actions;

export class NewTodo extends React.Component {
    constructor () { super(); }
    
    render () {
        return (
            <span>
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
            </span>
        );
    }
}