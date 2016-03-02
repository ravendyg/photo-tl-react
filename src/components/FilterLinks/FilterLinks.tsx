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
    constructor () { super(); }
    
    componentDidMount () {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }
    
    componentWillUnmount () {
        this.unsubscribe();
    }
    
    render () {
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