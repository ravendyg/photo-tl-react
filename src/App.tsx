import * as React from 'react';
import {Body} from './components/Body';
import {Header} from './components/Header';
import {LoaderOverlay} from './components/LoaderOverlay';
import {Modal} from './components/modals/Modal';
import {IDeps} from './types';

const pageStyleWrapper = {
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

interface IAppProps {
    deps: IDeps;
}

export class App extends React.PureComponent<IAppProps, {}> {
    componentWillMount() {
        const {
            deps: {
                photoStore,
                userActions,
                userStore,
            },
        } = this.props;
        userActions.load();
    }

    render() {
        const {deps} = this.props;
        const header = <Header deps={deps}/>;

        return (
            <div style={pageStyleWrapper}>
                <Body
                    deps={deps}
                    header={header}
                />
                <LoaderOverlay deps={deps}/>
                <Modal deps={deps}/>
            </div>
        );
    }
}

