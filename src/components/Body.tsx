import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppState} from '../store/state';

const bodyStyle = {
    flexGrow: 1,
}

interface IBodyProps {
    state: IAppState;
}

@observer
export class Body extends React.Component<IBodyProps, {}> {
    render() {
        const {state} = this.props;
        const {userState: {user}} = state;

        return (
            <div style={bodyStyle}>
                {`Body - ${Boolean(user) ? 'user info' : 'sign up'}`}
            </div>
        );
    }
}
