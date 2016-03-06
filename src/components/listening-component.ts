/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const store: IStore = require('./../store.ts');

export class ListeningComponent extends React.Component {
    protected _unsubscribe: () => void;
    protected setState: (state: any) => void;
    
    protected state: any;
    protected oldState: any;
    
    protected _store: IStore;
        
    constructor () {
        super();
        
        this._store = store;
    }
    
    private componentDidMount () {
        this._unsubscribe = this._store.subscribe(() => {
            let mutated = false;    
            for (var key in this.oldState) {
                // check given property exists on the global state, if then check whether it changed
                if (this._store.getState()[key] && this.oldState[key] !== this._store.getState()[key]) {
                    this.oldState[key] = this._store.getState()[key];
                    mutated = true;
                }
            } 
            if (mutated) {
                this.setState(this.oldState);
            }
        });
    }
    
    private componentWillUnmount () {
        this._unsubscribe();
    }
}