/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {UserToolbar} from './../toolbar/user-toolbar.tsx';
import {LoginDialog} from './../dialogs/login.tsx';

export class MyPhotos extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            <UserToolbar mode={`my-photos`}/>
            <div>My photos</div>
        </div>
        )
    }
}