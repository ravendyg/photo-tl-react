/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

export class Provider extends React.Component {
    
    static childContextTypes = {
        store: React.PropTypes.object
    }
    
    getChildContext () {
        return {
            store: this.props.store
        }
    }
    
    render () {
        return this.props.children
    }

}


