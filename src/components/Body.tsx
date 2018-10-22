import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppStore} from '../store/store';
import {ErrorPage} from '../pages/ErrorPage';
import {SignPage} from '../pages/SignPage';
import {PholoListPage} from '../pages/PhotoListPage';

interface IBodyProps {
    store: IAppStore;
}

@observer
export class Body extends React.Component<IBodyProps, {}> {
    closeError = console.log

    render() {
        const {store} = this.props;
        const {commonStore, userStore} = store;

        let content;
        if (commonStore.error) {
            return <ErrorPage
                error={commonStore.error}
                close={this.closeError}
            />;
        } else if (userStore.user) {
            return <PholoListPage
                store={store}
            />;
        } else {
            return <SignPage
                store={store}
            />;
        }
    }
}
