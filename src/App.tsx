import * as React from 'react';
import {Body} from './components/Body';
import {Header} from './components/Header';
import {LoaderOverlay} from './components/LoaderOverlay';
import {ModalWrapper} from './components/ModalWrapper';
import {IDeps} from './types';

const pageStyle = {
    width: '100%',
    minHeight: '100%',
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

        return (
            <div style={pageStyle}>
                <Header deps={deps}/>
                <Body deps={deps}/>
                <LoaderOverlay deps={deps}/>
                <ModalWrapper deps={deps}/>
            </div>
        );
    }
}
