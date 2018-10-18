import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppState} from '../store/state';
import {Body} from './Body';
import {Header} from './Header';

const pageStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}

interface IAppProps {
    state: IAppState
}

@observer
export class App extends React.Component<IAppProps, {}> {
    componentWillMount() {
        const {state: {userState}} = this.props;
        userState.load();
    }

    render() {
        const {state} = this.props;
        const {userState: {user, status}} = state;

        if (status === 'loading') {
            return 'loading';
        }
        if (status === 'error') {
            return 'error';
        }
        return (
            <div style={pageStyle}>
                <Header state={state}/>
                <Body state={state}/>
            </div>
        );
    }
}
