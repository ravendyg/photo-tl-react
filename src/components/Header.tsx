import * as React from 'react';
import {observer} from 'mobx-react';
import {IAppStore} from '../store/store';
import {Btn, EBtnType, EBtnSize} from './Btn';

const filterPartStyle = {
    flexGrow: 1,
};

const userInfoStyle = {
    padding: '1rem',
    width: '8rem',
};

const userInfoRowStyle = {
    lineHeight: '2rem',
    display: 'flex',
    alignItems: 'center',
};

const statusRowStyle = {
    ...userInfoRowStyle,
    display: 'flex',
    flexDirection: 'row',
}

const indicatorStyle = {
    borderRadius: '100%',
    minWidth: '0.75rem',
    minHeight: '0.75rem',
    display: 'inline-block',
};

function creteConnectionIndicatorStyle(status: string) {
    switch (status) {
        case 'connecting': return {
            ...indicatorStyle,
            backgroundColor: 'yellow',
        };

        case 'connected': return {
            ...indicatorStyle,
            backgroundColor: 'green',
        };

        case 'error': return {
            ...indicatorStyle,
            backgroundColor: 'red',
        };

        default: return {
            ...indicatorStyle,
            backgroundColor: 'gray',
        };
    }
}

const signOutStyle = {
    width: '6rem',
    padding: '2rem',
};

const headerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
};

interface IHeaderProps {
    store: IAppStore;
}

@observer
export class Header extends React.Component<IHeaderProps, {}> {
    signOut = () => {
        console.log('sign out');
    }

    render() {
        const {store} = this.props;
        const {userStore: {user}, photoStore} = store;

        if (!Boolean(user)) {
            return null;
        }

        const connectionIndicatorStyle = creteConnectionIndicatorStyle(photoStore.status);

        return (
            <div style={headerStyle}>
                <div style={filterPartStyle}>
                </div>
                <div style={userInfoStyle}>
                    <div style={userInfoRowStyle}>
                        {user.name}
                    </div>
                    <div style={statusRowStyle}>
                        <span style={connectionIndicatorStyle}></span>
                        <span style={{marginLeft: '1rem'}}>{photoStore.statusMessage}</span>
                    </div>
                </div>
                <div style={signOutStyle}>
                    <Btn
                        action={this.signOut}
                        label='Sign Out'
                        size={EBtnSize.MEDIUM}
                        type={EBtnType.SECONDARY}
                    />
                </div>
            </div>
        );
    }
}
