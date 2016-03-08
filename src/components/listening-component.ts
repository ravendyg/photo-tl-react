/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const store: IStore = require('./../store.ts');

export class ListeningComponent extends React.Component {
    protected _unsubscribe: () => void;
    protected setState: (state: any) => void;
    
    protected state: any;
    protected oldState: any;
    
    public props: any;
        
    constructor () {
        super();
    }
    
    private componentDidMount () {
        this._unsubscribe = store.subscribe(() => {
            let mutated = false;    
            for (var key in this.oldState) {
                // check given property exists on the global state, if then check whether it changed
                if (store.getState()[key] && this.oldState[key] !== store.getState()[key]) {
                    this.oldState[key] = store.getState()[key];
                    mutated = true;
                    break;
                }
            } 
            if (mutated) {
                this.transformState()
            }
        });
    }
    
    private componentWillUnmount () {
        this._unsubscribe();
    }
    
    // if child component needs data to be filtered, it shoul overload transformState
    protected transformState () {
        this.setState(this.oldState);
    }
}