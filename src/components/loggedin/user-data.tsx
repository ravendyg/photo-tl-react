/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class UserData extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar
                userName={store.getState().user.name}
                title={`Data`}
                hash={`/loggedin/user-data`}
            />
            <div>User data</div>
        </div>
        )
    }
}