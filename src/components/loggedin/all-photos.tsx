/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class AllPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar mode={`all-photos`}/>
            <div>All photos</div>
        </div>
        )
    }
}