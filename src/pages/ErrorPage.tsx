import * as React from 'react';
import {pageStyle} from '../styles';

const signPageStyle = {
    ...pageStyle,
}

interface ISignPage {
    error: string;
    close: () => void;
}

export class ErrorPage extends React.PureComponent<ISignPage, {}> {
    render() {
        const {close, error} = this.props;
        return (
            <div style={signPageStyle} onClick={close}>
                {error}
            </div>
        )
    }
}
