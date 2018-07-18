import * as React from 'react';
import { IStore } from '../../../typings/interfaces';
const store: IStore = require('./../../store.ts').Store;

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile';
import {UploadDialog} from './../dialogs/upload';
import {PhotoList} from './../photo-list/photo-list';
import {PhotoLoader} from './photo-loader';

export class MyPhotos extends React.Component<{}, {}> {
    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                user={store.getState().user}
                title={`My photos`}
                label={`All photos`}
                hash={`/loggedin/all-photos`} />
            :
            <UserToolbarMobile
                user={store.getState().user}
                title={`My photos`}
                hash={`/loggedin/all-photos`} />
        return (
        <div>
            {toolbar}
            <PhotoLoader />
            <PhotoList filter={`my`}/>
            <UploadDialog />
        </div>
        )
    }
}
