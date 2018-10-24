import * as React from 'react';
import {observer} from 'mobx-react';
import {ErrorPage} from '../pages/ErrorPage';
import {SignPage} from '../pages/SignPage';
import {PholoListPage} from '../pages/PhotoListPage';
import {IDeps} from '../types';

interface IBodyProps {
    deps: IDeps;
}

@observer
export class Body extends React.Component<IBodyProps, {}> {
    closeError = console.log

    render() {
        const {deps} = this.props;
        const {
            commonStore,
            userStore,
        } = deps;

        let content;
        if (commonStore.error) {
            return <ErrorPage
                error={commonStore.error}
                close={this.closeError}
            />;
        } else if (userStore.user) {
            return <PholoListPage deps={deps}/>;
        } else {
            return <SignPage deps={deps} />;
        }
    }
}
