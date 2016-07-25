/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts').Store;

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop.tsx';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class UserData extends React.Component {
    constructor(){ super();}

    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                userName={store.getState().user.name}
                title={`Data`}
                hash={`/loggedin/user-data`} />
            :
            <UserToolbarMobile
                userName={store.getState().user.name}
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