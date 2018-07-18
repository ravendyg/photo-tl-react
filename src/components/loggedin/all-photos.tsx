import * as React from 'react';
import {
    TComment,
    TUser
} from '../../../typings/types';
import { IStore } from '../../../typings/interfaces';

// data
const store: IStore = require('./../../store.ts').Store;

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile';
import {LoginDialog} from './../dialogs/login';
import {PhotoList} from './../photo-list/photo-list';

export class AllPhotos extends React.Component<{}, {}> {

    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                user={store.getState().user}
                title={`All photos`}
                label={`My photos`}
                hash={`/loggedin/my-photos`}
            />
            :
            <UserToolbarMobile
                user={store.getState().user}
                title={`All photos`}
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
