/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop.tsx';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile.tsx';
import {LoginDialog} from './../dialogs/login.tsx';
import {PhotoList} from './../photo-list/photo-list.tsx';

export class AllPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                userName={store.getState().user.name}
                title={`All photos`}
                label={`My photos`}
                hash={`/loggedin/my-photos`}
            />
            :
            <UserToolbarMobile
                userName={store.getState().user.name}
                title={`All photos`}
                label={`My photos`}
                hash={`/loggedin/my-photos`}
            />
        return (
        <div>
            {toolbar}
            <PhotoList filter={`all`}/>
        </div>
        )
    }
}