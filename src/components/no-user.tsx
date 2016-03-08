/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {NoUserToolbar} from './toolbar/no-user-toolbar.tsx';
import {LoginDialog} from './dialogs/login.tsx';

export class NoUser extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <NoUserToolbar />
            <h4>Please signin</h4>
            <p>Client: react, redux, material-ui, typescript</p>
            <p>Server: nodejs, mongodb, express, socket.io (try to run it in different tabs or browsers simultaneously)</p> 
            <LoginDialog />
        </div>
        )
    }
}