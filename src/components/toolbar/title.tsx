import * as React from 'react';
// ui
const ToolbarTitle = vendor.mUi.ToolbarTitle;

interface IProps {
    title: string;
}

export class Title extends React.Component<IProps, {}> {
    render() {
        return (
            <ToolbarTitle text={this.props.title}/>
        )
    }
}
