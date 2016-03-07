/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';
import {PhotoList} from './../photo-list/photo-list.tsx';

export class AllPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar
                userName={store.getState().user.name}
                title={`All photos`}
                label={`My photos`}
                hash={`/loggedin/my-photos`}
            />
            <PhotoList filter={`all`}/>
        </div>
        )
    }
}