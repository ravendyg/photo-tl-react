import * as React from 'react';
import {IAppStore} from './store/store';
import {Body} from './components/Body';
import {Header} from './components/Header';
import {LoaderOverlay} from './components/LoaderOverlay';

const pageStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
}

interface IAppProps {
    store: IAppStore
}

export class App extends React.PureComponent<IAppProps, {}> {
    componentWillMount() {
        const {store: {userStore}} = this.props;
        userStore.load();
    }

    render() {
        const {store} = this.props;

        return (
            <div style={pageStyle}>
                <Header store={store}/>
                <Body store={store}/>
                <LoaderOverlay store={store}/>
            </div>
        );
    }
}