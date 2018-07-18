import * as React from 'react';
import { TUser } from '../../../typings/types';
import {
    IStore,
    IUserActions
} from '../../../typings/interfaces';

import {ListeningComponent} from './../listening-component';
const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts').Store;

// ui
import * as Modal from 'react-modal';
import * as TextField from 'material-ui/lib/text-field';
import * as FlatButton from 'material-ui/lib/flat-button';
import * as RaisedButton from 'material-ui/lib/raised-button';
import * as Toolbar from 'material-ui/lib/toolbar/toolbar';
import * as ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import * as customStyles from './modal-style';

interface IState {
    dialogs: {
        in: boolean,
        up: boolean,
        upload: boolean,
        editPhoto: string
    },
    img: string;
    blob: any;
    inKey: number;
    user: TUser;
    error: string;
    disabled: boolean;
    text: string;
    title: string;
};

export class EditPhotoDialog extends ListeningComponent<{}, IState> {
    constructor (props) {
        super(props);

        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``,
            disabled: true,
            blob: null,
            img: '',
            inKey: 0,
            text: '',
            title: ''
        };
        this.oldState = this.state;
    }

    private _closeModal () {
        UserActions.hideDialogs();
    }

    private handleTitleChange = ({ target: { value } }: any) => {
        this.setState({title: value}, this._checkInput);
    };

    private handleTextChange = ({ target: { value } }: any) => {
        this.setState({text: value}, this._checkInput);
    };

    private _checkInput = () => {
        const { title, text } = this.state;
        if (!title || !text) {
            this.setState({disabled: false});
        }
    };

    private _doEdit = () => {
        const { title, text } = this.state;
        if (!title || !text) {
            return;
        }
        UserActions.editPhoto(this.state.dialogs.editPhoto, title, text);
        this._closeModal();
    };

    render () {
        let dialogs = this.state.dialogs;

        return (
            <Modal
                isOpen={dialogs.editPhoto.length>0}
                onRequestClose={() => this._closeModal()}
                style={customStyles}
            >
                <Toolbar>
                    <ToolbarTitle text={'Edit Photo'}/>
                </Toolbar>

                <TextField
                    hintText="Title"
                    multiLine={false}
                    fullWidth={true}
                    onChange={this.handleTitleChange}
                /><br/>
                <TextField
                    hintText="Description"
                    multiLine={true}
                    rows={1}
                    rowsMax={6}
                    fullWidth={true}
                    onChange={this.handleTextChange}
                /><br/>

                <FlatButton
                    style={{float: 'left', marginLeft: '15px'}}
                    label="Cancel"
                    onClick={this._closeModal}
                />
                <RaisedButton
                    style={{float: 'right', marginRight: '15px'}}
                    label={`Save`}
                    disabled={this.state.disabled}
                    onClick={this._doEdit}
                /><br/>
                {this.state.error && (
                    <div style={{
                        marginTop: `40px`,
                        textAlign: `center`,
                        display: this.state.error ? `block` : `none`
                    }}>{this.state.error}</div>
                )}
            </Modal>
        );
    }
}


