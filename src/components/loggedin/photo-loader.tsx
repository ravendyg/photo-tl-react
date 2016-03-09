/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

const FlatButton = vendor.mUi.FlatButton;

export class PhotoLoader extends React.Component {
    constructor(){ super();}
    
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