/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

export class FilterLink extends React.Component {
    constructor () { super(); }
    
    render () {
        const filter = this.props.filter;
        const children = this.props.children;
        const onSelectClick = this.props.onSelectClick;
        
        return (
            <span>
                {' '}
                <a href='#'
                    onClick={e=>{
                        onSelectClick(e, filter);
                    }}
                >
                    {children}
                </a>
            </span>
        );
    }
}
