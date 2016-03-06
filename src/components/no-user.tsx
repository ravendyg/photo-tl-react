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
            <div>No user</div>
            <LoginDialog name={'login'}/>
        </div>
        )
    }
}