/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {ListeningComponent} from './../listening-component.ts';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts');

// ui
const Modal = vendor.mUi.Modal;
const FlatButton = vendor.mUi.FlatButton;
const RaisedButton = vendor.mUi.RaisedButton;
const Toolbar = vendor.mUi.Toolbar;
const Title = require('./../toolbar/title.tsx');
const TextField = vendor.mUi.TextField;
const Toggle = vendor.mUi.Toggle;

// {
//   overlay : {
//     position          : 'fixed',
//     top               : 0,
//     left              : 0,
//     right             : 0,
//     bottom            : 0,
//     backgroundColor   : 'rgba(255, 255, 255, 0.75)'
//   },
//   content : {
//     position                   : 'absolute',
//     top                        : '40px',
//     left                       : '40px',
//     right                      : '40px',
//     bottom                     : '40px',
//     border                     : '1px solid #ccc',
//     background                 : '#fff',
//     overflow                   : 'auto',
//     WebkitOverflowScrolling    : 'touch',
//     borderRadius               : '4px',
//     outline                    : 'none',
//     padding                    : '20px'

//   }
// };

// toggle styles
// const styles = {
//   block: {
//     maxWidth: 250,
//   },
//   toggle: {
//     marginBottom: 16,
//   },
// };

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export class LoginDialog extends ListeningComponent {
    private _in: any;
    private _up: any;
    protected needToReRender: any;
    
    private _user: UserType;
    
    constructor () {
        super(store);
        
        this._in = store.getState().dialogs.in;
        this._up = store.getState().dialogs.up;
               
        this._user = {
            name: ``,
            pas: ``,
            pas2: ``,
            rem: false,
            error: ``
        };
    }
    
    protected trackRenderDependecies () {
        this.needToReRender = {
            dialogs: store.getState().dialogs,
        };
    }
    
    private _verifyInput (): boolean {
        // check input for correctness
        if (this._user.name.match(/[^0-1a-zA-Z\s]/)) {
            this._user.error = 'Only letters or numbers!';
            return false;
        }
        if (this._user.name.match(/^\s*$/)) {
            this._user.error = `Login can't be empty`;
            return false;
        }
        if (this._user.pas.match(/^\s*$/)) {
            this._user.error = `Password can't be empty`;
            return false;
        }
        if (this._up && this._user.pas !== this._user.pas2) {
            this._user.error = `Password doesn't match`;
            return false;
        }
        return true;
    }
    
    private _signin () {
        if (this._verifyInput()) {
            if (this._in) {
                // send signin request
                UserActions.signin(
                    this._user.name,
                    this._user.pas,
                    this._user.rem
                );
            } else if (this._up) {
                // send signup request
                UserActions.signup(
                    this._user.name,
                    this._user.pas,
                    this._user.pas2,
                    this._user.rem
                );
            }
            this.closeModal();
        } else {
            this.forceUpdate();
        }
    }

    closeModal () {
        this._user = {
            name: ``,
            pas: ``,
            pas2: ``,
            rem: false,
            error: ``
        };
        UserActions.hideDialogs();
    }

    render () {
        this._in = store.getState().dialogs.in;
        this._up = store.getState().dialogs.up;
        
        let name, pas, pas2, rem;
        
        let label: string;
        if (this._in) label = `SignIn`;
        else if (this._up) label = `SignUp`;
        else label = `Error`;
        
        // need confirmation only for signup
        let confirmPassword;
        if (this._up) {
            confirmPassword =
                <span> 
                    <TextField
                        hintText="Confirm password"
                        multiline={false}
                        type="password"
                        ref={node => {
                            pas2 = node;
                        }}
                    /><br />
                </span>;
        } else {
            confirmPassword = null;
        }
        
        return (
            <Modal
                isOpen={this._in || this._up}
                onRequestClose={() => this.closeModal()}
                style={customStyles}
            >
                <Toolbar>
                    <Title title={label} />
                </Toolbar>
                <TextField
                    hintText="User name"
                    multiline={false}
                    ref={node => {
                        name = node;
                    }}
                /><br />
                <TextField
                    hintText="Password"
                    multiline={false}
                    type="password"
                    ref={node => {
                        pas = node;
                    }}
                /><br />
                {confirmPassword}
                <Toggle
                    label="Remember"
                    defaultToggled={this._user.rem}
                    ref={node => {
                        rem = node;
                    }}
                /><br />
                <FlatButton 
                    style={{float: 'left', marginLeft: '15px'}}
                    label="Cancel"
                    onClick={() => {
                        this.closeModal();
                    }}
                />
                <RaisedButton 
                    style={{float: 'right', marginRight: '15px'}}
                    label={label}
                    onClick={() => {
                        this._user.name = name.input.value;
                        this._user.pas = pas.input.value;
                        this._user.pas2 = this._up ? pas2.input.value : ``;
                        this._user.rem = rem.isToggled();
                        this._signin();
                    }}
                /><br />
                <div style={{marginTop: `40px`, textAlign: `center`}}>{this._user.error}</div>
            </Modal>
        );
    }
}