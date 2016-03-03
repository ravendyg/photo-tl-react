/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {ListeningComponent} from './../listening-component.ts';
const actionCreators: IActionCreators = require('./../../action-creators.ts').actionCreators;

// data
const store: IStore = require('./../../store.ts');
const filterLinkNames = [`All`, `Active`, `Completed`];

// components
import {FilterLink} from './FilterLink.tsx';

const onSelectClick = (e, filter) => {
    e.preventDefault();
    store.dispatch(actionCreators.setVisibilityFilter(filter));
}

export class FilterLinks extends ListeningComponent {
    protected needToReRender: any;
    
    constructor () { super(store); }
    
    protected trackRenderDependecies () {
        this.needToReRender = {
            visibilityFilter: store.getState().visibilityFilter
        };
    }
    
    public render () {
        super.render();

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