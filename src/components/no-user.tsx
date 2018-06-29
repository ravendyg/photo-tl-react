/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {NoUserToolbarDesktop} from './toolbar/no-user-toolbar-desktop.tsx';
import {NoUserToolbarMobile} from './toolbar/no-user-toolbar-mobile.tsx';
import {LoginDialog} from './dialogs/login.tsx';

export class NoUser extends React.Component {
    constructor(){ super();}

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
