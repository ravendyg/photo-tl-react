import * as React from 'react';
import { TUser } from '../../../typings/types';
import {
    IStore,
    IUserActions
} from '../../../typings/interfaces';

const fixOrientation = vendor.fixOrientation;

import {ListeningComponent} from './../listening-component';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts').Store;

// ui
const Modal = vendor.mUi.Modal;
const FlatButton = vendor.mUi.FlatButton;
const RaisedButton = vendor.mUi.RaisedButton;
const Toolbar = vendor.mUi.Toolbar;
const Title = require('./../toolbar/title.tsx');
const TextField = vendor.mUi.TextField;
const Toggle = vendor.mUi.Toggle;

const customStyles = require('./modal-style.ts');

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
    user: TUser,
    error: string,
    disabled: boolean
};

export class EditPhotoDialog extends ListeningComponent<{}, IState> {
    private _titleRef: any = null;
    private _textRef: any = null;

    constructor (props) {
        super(props);

        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``,
            disabled: true,
            blob: null,
            img: '',
            inKey: 0
        };
        this.oldState = this.state;
    }

    private _verifyInput (e: any) {
        // check input for correctness
        var reader = new FileReader();
        try {
            if (e.input.files[0] && e.input.files[0].type.match(/image/)) {
                reader.readAsDataURL(e.input.files[0]);
                reader.onload = () => {
                    // display preview
                    fixOrientation(reader.result, { image: true }, (fixed: string, image) => {
                        this.setState({
                            img: fixed,
                            blob: e.input.files[0],
                            disabled: false
                        });
                    });
                };
            } else {
                throw new Error("Wrong file");
            }
        } catch (e) {
            this.setState({
                error: e.message,
                inKey: Date.now(),
                img: `react/assets/noimage.png`,
                blob: null,
                disabled: true
            });
        }

    }

    private _closeModal () {
        UserActions.hideDialogs();
    }

    private _checkInput = () => {
        const {
            _titleRef,
            _textRef
        } = this;
        if (!_textRef || !_titleRef || !_titleRef.getValue() || !_textRef.getValue()) {
            this.setState({disabled: false});
        }
    };

    private _doEdit = () => {
        const {
            _titleRef,
            _textRef
        } = this;
        if (!_textRef || !_titleRef) {
            return;
        }
        UserActions.editPhoto(this.state.dialogs.editPhoto, _titleRef.getValue(), _textRef.getValue());
        this._closeModal();
    };

    render () {
        let dialogs = this.state.dialogs;
        let img: any;

        return (
            <Modal
                isOpen={dialogs.editPhoto.length>0}
                onRequestClose={() => this._closeModal()}
                style={customStyles}
            >
                <Toolbar>
                    <Title title={`Edit Photo`} />
                </Toolbar>

                <TextField
                    hintText="Title"
                    multiLine={false}
                    fullWidth={true}
                    ref={node => {
                        this._titleRef = node;
                    }}
                    onChange={this._checkInput}
                /><br />
                <TextField
                    hintText="Description"
                    multiLine={true}
                    rows={1}
                    rowsMax={6}
                    fullWidth={true}
                    ref={node => {
                        this._textRef = node;
                    }}
                    onChange={this._checkInput}
                /><br />

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
                /><br />
                <div style={{
                    marginTop: `40px`,
                    textAlign: `center`,
                    display: this.state.error ? `block` : `none`
                }}>{this.state.error}</div>
            </Modal>
        );
    }
}
