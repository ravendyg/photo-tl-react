import * as React from 'react';
import { IUserActions } from '../../../typings/interfaces';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import * as FlatButton from 'material-ui/lib/flat-button';

export class PhotoLoader extends React.Component<{}, {}> {
    render() {
        let btnStyle = (window.innerWidth>600) ? {marginLeft: `5%`} : {marginTop: `15px`, marginBottom: `15px`};
        return (
        <div style={btnStyle}>
            <FlatButton onClick={() => { UserActions.displayPhotoUpload(); }}>
                <i  className="fa fa-camera"></i>
                <span> Load new photo</span>
            </FlatButton>
        </div>
        )
    }
}
