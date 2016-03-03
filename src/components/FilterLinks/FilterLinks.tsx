/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

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