import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppState} from '../store/state';

const headerStyle = {
    width: '100%',
    height: '64px',
};

interface IHeaderProps {
    state: IAppState;
}

@observer
export class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const {state} = this.props;
        const {userState: {user}} = state;

        return (
            <div style={headerStyle}>
                {`Header - ${Boolean(user) ? 'user info' : 'sign up'}`}
            </div>
        );
    }
}
