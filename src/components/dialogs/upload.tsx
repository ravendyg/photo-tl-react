import * as React from 'react';
import { TUser } from '../../../typings/types';
import { IStore, IUserActions } from '../../../typings/interfaces';

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
        upload: boolean
    },
    user: TUser,
    error: string,
    img: string,
    blob: any,
    inKey: number, // to force input update
    disabled: boolean
};

export class UploadDialog extends ListeningComponent<{}, IState> {

    constructor(props) {
        super(props);

        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``,
            img: `react/assets/noimage.png`,
            blob: null,
            inKey: Date.now(),
            disabled: true
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

    private _upload (title: string, text: string) {
        UserActions.uploadPhoto(this.state.blob, title, text);
        this.closeModal()
    }

    private closeModal () {
        UserActions.hideDialogs();
        this.setState({
            img: `react/assets/noimage.png`,
            error: ``,
            blob: null
        });
    }

    private hideError () {
        if (this.state.error) {
            this.setState({error: ``});
        }
    }

    render () {
        // preloader is useless when rotating an image, because it blocks everything
        let error = this.state.error;
        let dialogs = this.state.dialogs;
        let img: any;
        let title: any, text: any;

        return (
            <Modal
                isOpen={dialogs.upload}
                onRequestClose={() => this.closeModal()}
                style={customStyles}
            >
                <Toolbar>
                    <Title title={`New Photo`} />
                </Toolbar>
                <div style={{textAlign: `center`}}>
                    <img style={{margin: `auto`, maxWidth: `265px`, maxHeight: `256px`}}
                        alt={`no image`}
                        src={this.state.img} /><br />
                </div>
                <TextField
                    key={this.state.inKey}
                    type={`file`}
                    multiLine={false}
                    fullWidth={true}
                    ref={node => {
                        img = node;
                    }}
                    onChange={() => { this._verifyInput(img); }}
                    onClick={() => { this.hideError(); }}
                /><br />

                <TextField
                    hintText="Title"
                    multiLine={false}
                    fullWidth={true}
                    ref={node => {
                        title = node;
                    }}
                    onChange={() => { this.hideError() }}
                /><br />
                <TextField
                    hintText="Description"
                    multiLine={true}
                    rows={1}
                    rowsMax={6}
                    fullWidth={true}
                    ref={node => {
                        text = node;
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
                    label={`Upload`}
                    disabled={this.state.disabled}
                    onClick={() => {
                        this._upload(title.input.value, text.input.getInputNode().value);
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
