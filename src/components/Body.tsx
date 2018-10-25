import * as React from 'react';
import {observer} from 'mobx-react';
import {ErrorPage} from '../pages/ErrorPage';
import {SignPage} from '../pages/SignPage';
import {PholoListPage} from '../pages/PhotoListPage';
import {IDeps} from '../types';

interface IBodyProps {
    deps: IDeps;
    header: JSX.Element;
}

@observer
export class Body extends React.Component<IBodyProps, {}> {
    closeError = console.log

    render() {
        const {
            deps,
            header,
        } = this.props;
        const {
            commonStore,
            userStore,
        } = deps;
        let pageStyle: any = {};
        if (commonStore.modal) {
            pageStyle.overflow = 'hidden';
        }

        if (commonStore.error) {
            return <ErrorPage
                error={commonStore.error}
                close={this.closeError}
            />;
        } else if (userStore.user) {
            return (
                <div style={pageStyle}>
                    {header}
                    <PholoListPage deps={deps}/>
                </div>
            )
        } else {
            return <SignPage deps={deps} />;
        }
    }
}
