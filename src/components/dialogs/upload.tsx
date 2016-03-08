/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const fixOrientation = vendor.fixOrientation;

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

export class UploadDialog extends ListeningComponent {  
    protected setState: (state: any) => void;
    protected state: {
        dialogs: {
            in: boolean,
            up: boolean,
            upload: boolean
        },
        user: UserType,
        error: string,
        img: string,
        blob: any,
        inKey: number, // to force input update
        disabled: boolean
    };
    
    protected oldState: {
        dialogs: {
            in: boolean,
            up: boolean,
            upload: boolean
        },
        user: UserType
    };
    
    private _user: UserType;
    
    constructor () {
        super();
        
        this.state = {
            dialogs: store.getState().dialogs,
            user: store.getState().user,
            error: ``,
            img: `react/assets/noimage.png`,
            blob: null,
            inKey: Date.now(),
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
        
    private _upload (title: string, text: string) {
        console.log(`sent to server`);
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
                isOpen={dialogs.in || dialogs.up}
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
                    ref={node => {
                        img = node;
                    }}
                    onChange={() => { this._verifyInput(img); }}
                    onClick={() => { this.hideError(); }}
                /><br />
                
                <TextField
                    hintText="Title"
                    multiLine={false}
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