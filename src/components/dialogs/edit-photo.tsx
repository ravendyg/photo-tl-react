/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const fixOrientation = vendor.fixOrientation;

import {ListeningComponent} from './../listening-component.ts';

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

export class EditPhotoDialog extends ListeningComponent {
    protected setState: (state: any) => void;
    protected state: {
        dialogs: {
            in: boolean,
            up: boolean,
            upload: boolean,
            editPhoto: string
        },
        user: TUser,
        error: string,
        // img: string,
        // blob: any,
        // inKey: number, // to force input update
        disabled: boolean
    };

    protected oldState: {
        dialogs: {
            in: boolean,
            up: boolean,
            upload: boolean,
            editPhoto: string
        },
        user: TUser
    };

    private _user: TUser;
    private _titleRef: any = null;
    private _textRef: any = null;

    constructor () {
        super();

        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``,
            // img: `react/assets/noimage.png`,
            // blob: null,
            // inKey: Date.now(),
            disabled: true
        };
        this.oldState = {
            dialogs: store.getState().dialogs,
            user: store.getState().user
        };
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
        // preloader is useless when rotating an image, because it blocks everything
        // let error = this.state.error;
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
