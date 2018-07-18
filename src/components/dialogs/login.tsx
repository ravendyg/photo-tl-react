import * as React from 'react';
import {
    TUser,
    TUserRequest
} from '../../../typings/types';
import {
    IStore,
    IUserActions
} from '../../../typings/interfaces';

import {ListeningComponent} from '../listening-component';

const UserActions: IUserActions = require('../../user-actions').UserActions;

// data
const store: IStore = require('../../store').Store;

// ui
import * as Modal from 'react-modal';
import * as TextField from 'material-ui/lib/text-field';
import * as FlatButton from 'material-ui/lib/flat-button';
import * as RaisedButton from 'material-ui/lib/raised-button';
import * as Toolbar from 'material-ui/lib/toolbar/toolbar';
import * as ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import * as Toggle from 'material-ui/lib/toggle';

import * as customStyles from './modal-style';

interface IState {
    dialogs: {
        in: boolean,
        up: boolean
    },
    user: TUser,
    error: string
};

export class LoginDialog extends ListeningComponent<{}, IState> {

    private _user: TUserRequest;

    constructor(props) {
        super(props);

        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ''
        };
        this.oldState = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ''
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

    private _signin = () => {
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

    private handleNameChange = ({ target: { value } }: any) => {
        this._user.name = value;
        this.hideError();
    };

    private handlePasswordChange = ({ target: { value } }: any) => {
        this._user.pas = value;
        this.hideError();
    };

    private handlePassword2Change = ({ target: { value } }: any) => {
        this._user.pas2 = value;
        this.hideError()
    };

    private handleRememberChange = ({ target: { value } }: any) => {
        this._user.rem = Boolean(value);
        this.hideError();
    };

    private handleSign = () => {

        this._signin();
    }

    render () {
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
                        fullWidth={true}
                        onChange={this.handlePassword2Change}
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
                    <ToolbarTitle text={label}/>
                </Toolbar>
                <TextField
                    hintText="User name"
                    multiline={false}
                    fullWidth={true}
                    onChange={this.handleNameChange}
                /><br />
                <TextField
                    hintText="Password"
                    multiline={false}
                    type="password"
                    fullWidth={true}
                    onChange={this.handlePasswordChange}
                /><br />
                {confirmPassword}
                <Toggle
                    label="Remember"
                    defaultToggled={this._user.rem}
                    onChange={this.handleRememberChange}
                /><br />
                <FlatButton
                    style={{float: 'left', marginLeft: '15px'}}
                    label="Cancel"
                    onClick={this.closeModal}
                />
                <RaisedButton
                    style={{float: 'right', marginRight: '15px'}}
                    label={label}
                    onClick={this._signin}
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
