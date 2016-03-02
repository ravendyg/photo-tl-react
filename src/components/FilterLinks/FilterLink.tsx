/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');
const actions: Actions = require('./../../consts.ts').Actions;

export class FilterLink extends React.Component {
    private _filter: Filters;
    private _children: string;
    
    constructor ({
        filter,
        children
    }) {
        super();
        this._filter = filter;
        this._children = children;        
    }
    
    render () {
        var self = this;
        return (
            <span>
                {' '}
                <a href='#'
                    onClick={e=>{
                        e.preventDefault();
                        store.dispatch({
                            type: actions.SET_VISIBITY_FILTER,
                            payload: {
                                filter: self._filter
                            }
                        });
                    }}
                >
                    {self._children}
                </a>
            </span>
        );
    }
}