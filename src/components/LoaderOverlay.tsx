import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppStore} from '../store/store';

const loaderOverlayStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(230, 230, 230, 0.8)',
}

interface ILoaderOverlay {
    store: IAppStore;
}

@observer
export class LoaderOverlay extends React.Component<ILoaderOverlay, {}> {
    render() {
        const {
            store: {
                userStore
            },
        } = this.props;

        return userStore.loading
            ? (
                <div style={loaderOverlayStyle}>
                    Loading
                </div>
            )
            : null;
    }
}
