import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppStore} from '../store/store';
import {ErrorPage} from '../pages/ErrorPage';
import {SignPage} from '../pages/SignPage';
import {PholoListPage} from '../pages/PhotoListPage';
import {IDeps} from '../types';

interface IBodyProps {
    store: IAppStore;
    deps: IDeps;
}

@observer
export class Body extends React.Component<IBodyProps, {}> {
    closeError = console.log

    render() {
        const {
            deps,
            store,
        } = this.props;
        const {
            userStore,
        } = deps;
        const {commonStore} = store;

        let content;
        if (commonStore.error) {
            return <ErrorPage
                error={commonStore.error}
                close={this.closeError}
            />;
        } else if (userStore.user) {
            return <PholoListPage
                store={store}
                deps={deps}
            />;
        } else {
            return <SignPage
                store={store}
                deps={deps}
            />;
        }
    }
}
