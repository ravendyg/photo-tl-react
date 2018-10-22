import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppStore} from '../store/store';

const headerStyle = {
    width: '100%',
    height: '64px',
};

interface IHeaderProps {
    store: IAppStore;
}

@observer
export class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const {store} = this.props;
        const {userStore: {user}, photoStore} = store;

        if (!Boolean(user)) {
            return null;
        }

        return (
            <div style={headerStyle}>
                <div>
                    {`Status: ${photoStore.state}`}
                </div>
                <div>
                    {user.name}
                </div>
            </div>
        );
    }
}
