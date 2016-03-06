/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// ui
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const ToolbarTitle = vendor.mUi.ToolbarTitle;

export = class Title extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
                <ToolbarTitle text={this.props.title}/>
        )        
    }
}