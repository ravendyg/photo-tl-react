/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const actions: Actions = require('./../../consts.ts').Actions;

// data
const store: IStore = require('./../../store.ts');

import {FilterLink} from './FilterLink.tsx';

const filterLinkNames = [`All`, `Active`, `Completed`];

const onSelectClick = (e, filter) => {
    e.preventDefault();
    store.dispatch({
        type: actions.SET_VISIBITY_FILTER,
        payload: {
            filter
        }
    });
}

export class FilterLinks extends React.Component implements IReactComponent {
    private _unsubscribe: any;
    private needToReRender: any;
    
    constructor () { super(); }
    
    componentDidMount () {
        // track change of only a part of the store that is of interest
        this.needToReRender = store.getState().visibilityFilter;
        
        this._unsubscribe = store.subscribe(() => {
            if (this.needToReRender !== store.getState().visibilityFilter) {
                this.forceUpdate();    
            }
        });
    }
    
    componentWillUnmount () {
        this._unsubscribe();
    }
    
    render () {
        this.needToReRender = store.getState().visibilityFilter;

        return (
            <p>
                Show:
                {filterLinkNames.map((mode, filter) => {
                    if (store.getState().visibilityFilter !== filter) { return (
                        <FilterLink
                            key={filter}
                            filter={filter}
                            children={mode}
                            onSelectClick={onSelectClick}
                        />
                    )} else { return (
                        <span key={filter}>
                            {` ${mode}`}
                        </span>
                    )}
                })}   
            </p>
        );
    }
}