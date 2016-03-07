/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class MyPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar
                userName={store.getState().user.name}
                title={`My photos`}
                label={`All photos`}
                hash={`/loggedin/all-photos`}
            />
            <div>My photos</div>
        </div>
        )
    }
}