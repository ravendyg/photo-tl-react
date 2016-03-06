/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

export class ListeningComponent extends React.Component {
    private _unsubscribe: any;
    protected needToReRender: any;
    
    protected _store: IStore;
    
    constructor (store) {
        super();
        
        this._store = store;
    }
    
    protected trackRenderDependecies () {
        // to be implemented by subclass
    }
    
    componentDidMount () {
        // track change of only a part of the store that is of interest
        this.trackRenderDependecies();
        
        this._unsubscribe = this._store.subscribe(() => {    
            for (var key in this.needToReRender) {
                if (this.needToReRender[key] !== this._store.getState()[key]) {
                    this.forceUpdate();
                    break;
                }
            } 
        });
    }
    
    componentWillUnmount () {
console.log(this);
        this._unsubscribe();
    }
    
    public render () {
        // important to call super in subclass render method
        // otherwise after relevant change in the state
        // it will render on any! state change even if this particular one is irrelevant
        this.trackRenderDependecies();
    }
}