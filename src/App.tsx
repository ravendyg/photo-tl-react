import * as React from 'react';
import {IAppStore} from './store/store';
import {Body} from './components/Body';
import {Header} from './components/Header';
import {LoaderOverlay} from './components/LoaderOverlay';
import {IDeps} from './types';

const pageStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}

interface IAppProps {
    store: IAppStore;
    deps: IDeps;
}

export class App extends React.PureComponent<IAppProps, {}> {
    componentWillMount() {
        const {
            deps: {
                userActions,
                userStore,
            },
            store: {
                photoStore,
            }
        } = this.props;
        userActions.load()
            .then(() => {
                if (userStore.user) {
                    photoStore.connect(userStore.user);
                }
            }).catch(console.error);
    }

    render() {
        const {deps, store} = this.props;

        return (
            <div style={pageStyle}>
                <Header store={store} deps={deps}/>
                <Body store={store} deps={deps}/>
                <LoaderOverlay deps={deps}/>
            </div>
        );
    }
}
