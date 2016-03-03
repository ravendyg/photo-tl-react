/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const actionCreators: IActionCreators = require('./../../action-creators.ts').actionCreators;

// data
const store: IStore = require('./../../store.ts');

const onAddClick = (input: HTMLInputElement) => {
    store.dispatch(actionCreators.addTodo(input.value));
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