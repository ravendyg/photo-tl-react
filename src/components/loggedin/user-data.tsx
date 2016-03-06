/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class UserData extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar mode={`data`} />
            <div>User data</div>
        </div>
        )
    }
}