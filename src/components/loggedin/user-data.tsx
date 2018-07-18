import * as React from 'react';
import { IStore } from '../../../typings/interfaces';
const store: IStore = require('./../../store.ts').Store;

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile';

export class UserData extends React.Component<{}, {}> {
    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                user={store.getState().user}
                title={`Data`}
                label={`My photos`}
                hash={`/loggedin/user-data`} />
            :
            <UserToolbarMobile
                user={store.getState().user}
                title={`Data`}
                hash={`/loggedin/user-data`} />
        return (
        <div>
            {toolbar}
            <div>User data</div>
        </div>
        )
    }
}
