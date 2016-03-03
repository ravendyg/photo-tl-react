/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const RaisedButton = vendor.mUi.RaisedButton;
const TextField = vendor.mUi.TextField;

const actionCreators: IActionCreators = require('./../../action-creators.ts').actionCreators;

// data
const store: IStore = require('./../../store.ts');

const onAddClick = (input: HTMLInputElement) => {
    store.dispatch(actionCreators.addTodo(input.value));
    input.value = '';
};


export class NewTodo extends React.Component {
    private _input: any;
    
    constructor () { super(); }
    
    render () {
        let input = this._input;
        
        return (
            <div>
                <TextField
                    hintText="New Todo"
                    multiline={false}
                    ref={node => {
                        input = node;
                    }}
                />
                <RaisedButton 
                    label="Add Todo"
                    onClick={() => {
                        onAddClick(input.input)
                    }}
                />
            </div>
        );
    }
}