/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// data
const store: IStore = require('./../../store.ts');

import {UserToolbarDesktop} from './../toolbar/user-toolbar-desktop.tsx';
import {UserToolbarMobile} from './../toolbar/user-toolbar-mobile.tsx';
import {UploadDialog} from './../dialogs/upload.tsx';
import {PhotoList} from './../photo-list/photo-list.tsx';
import {PhotoLoader} from './photo-loader.tsx';

export class MyPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        let toolbar = (window.outerWidth > 500)
            ?
            <UserToolbarDesktop
                userName={store.getState().user.name}
                title={`My photos`}
                label={`All photos`}
                hash={`/loggedin/all-photos`} />
            :
            <UserToolbarMobile
                userName={store.getState().user.name}
                title={`My photos`}
                label={`All photos`}
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