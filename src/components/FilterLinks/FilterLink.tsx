/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');
const actions: Actions = require('./../../consts.ts').Actions;

export class FilterLink extends React.Component {
    constructor () { super(); }
    
    render () {
        const filter = this.props.filter;
        const children = this.props.children;
        
        return (
            <span>
                {' '}
                <a href='#'
                    onClick={e=>{
                        e.preventDefault();
                        store.dispatch({
                            type: actions.SET_VISIBITY_FILTER,
                            payload: {
                                filter: filter
                            }
                        });
                    }}
                >
                    {children}
                </a>
            </span>
        );
    }
}