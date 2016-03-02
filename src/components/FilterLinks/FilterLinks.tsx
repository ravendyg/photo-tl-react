/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {FilterLink} from './FilterLink.tsx';

const filterLinkNames = [`All`, `Active`, `Completed`];

export class FilterLinks extends React.Component {
    constructor () {
        super();        
    }
    
    render () {
        return (
            <p>
                Show:
                {filterLinkNames.map((mode, index) => {
                    if (store.getState().visibilityFilter !== index) { return (
                        <FilterLink
                            key={index}
                            filter={index}
                            children={mode}
                        />
                    )} else { return (
                        <span>
                            {` ${mode}`}
                        </span>
                    )}
                })}   
            </p>
        );
    }
}