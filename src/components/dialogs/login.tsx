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

const customStyles = require('./modal-style.ts');
console.log(customStyles);

export class LoginDialog extends ListeningComponent {  
    protected setState: (state: any) => void;
    protected state: {
        dialogs: {
            in: boolean,
            up: boolean
        },
        user: UserType,
        error: string 
    };
    
    protected oldState: {
        dialogs: {
            in: boolean,
            up: boolean
        },
        user: UserType
    };
    
    private _user: UserType;
    
    constructor () {
        super();
        
        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``
        };
        this.oldState = {
            dialogs: store.getState().dialogs,
            user: store.getState().user
        };
               
        this._user = {
            name: ``,
            pas: ``,
            pas2: ``,
            rem: false
        };
    }
    
    private _verifyInput (): string {
        // check input for correctness
        if (this._user.name.match(/[^0-1a-zA-Z\s]/)) {
            return 'Only letters or numbers!';
        }
        if (this._user.name.match(/^\s*$/)) {
            return `Login can't be empty`;
        }
        if (this._user.pas.match(/^\s*$/)) {
            return `Password can't be empty`;
        }
        if (this.state.dialogs.up && this._user.pas !== this._user.pas2) {
            return `Password doesn't match`;
        }
        return ``;
    }
        
    private _signin () {
        var error = this._verifyInput(); 
        if (!error) {
            if (this.state.dialogs.in) {
                // send signin request
                UserActions.signin(
                    this._user.name,
                    this._user.pas,
                    this._user.rem
                ).then(
                    () => { this.closeModal(); },
                    (error) => {
                        this.setState({error});
                    }
                );
            } else if (this.state.dialogs.up) {
                // send signup request
                UserActions.signup(
                    this._user.name,
                    this._user.pas,
                    this._user.pas2,
                    this._user.rem
                ).then(
                    () => { this.closeModal(); },
                    (error) => {
                        this.setState({error});
                    }
                );
            }
        } else {
            this.setState({error});
        }
    }

    private closeModal () {
        this._user = {
            name: ``,
            pas: ``,
            pas2: ``,
            rem: false
        };
        UserActions.hideDialogs();
        this.setState({error: ``});
    }
    
    private hideError () {
        if (this.state.error) {
            this.setState({error: ``});
        }
    }

    render () {
        
        let name, pas, pas2, rem;
        
        let error = this.state.error;
        let dialogs = this.state.dialogs;
        
        let label: string;
        
        if (dialogs.in) label = `SignIn`;
        else if (dialogs.up) label = `SignUp`;
        else label = `Error`;
              
        // need confirmation only for signup
        let confirmPassword;
        if (dialogs.up) {
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
                isOpen={dialogs.in || dialogs.up}
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
                    onChange={() => { this.hideError() }}
                /><br />
                <TextField
                    hintText="Password"
                    multiline={false}
                    type="password"
                    ref={node => {
                        pas = node;
                    }}
                    onChange={() => { this.hideError() }}
                /><br />
                {confirmPassword}
                <Toggle
                    label="Remember"
                    defaultToggled={this._user.rem}
                    ref={node => {
                        rem = node;
                    }}
                    onChange={() => { this.hideError() }}
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
                        this._user = {
                            name: name.input.value,
                            pas: pas.input.value,
                            pas2: dialogs.up ? pas2.input.value : ``,
                            rem: rem.isToggled()
                        };
                        this._signin();
                    }}
                /><br />
                <div style={{
                    marginTop: `40px`,
                    textAlign: `center`,
                    display: error ? `block` : `none`
                }}>{error}</div>
            </Modal>
        );
    }
}