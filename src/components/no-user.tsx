import * as React from 'react';

import {NoUserToolbarDesktop} from './toolbar/no-user-toolbar-desktop';
import {NoUserToolbarMobile} from './toolbar/no-user-toolbar-mobile';
import {LoginDialog} from './dialogs/login';

export class NoUser extends React.Component<{}, {}> {
    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <NoUserToolbarDesktop />
            :
            <NoUserToolbarMobile />
        return (
        <div>
            {toolbar}
            <h4>Please signin</h4>
            <p>Client: react, redux, material-ui, typescript</p>
            <p>Server: nodejs, mongodb, express, websockets (try to run it in different tabs or browsers simultaneously)</p>
            <LoginDialog />
        </div>
        )
    }
}
