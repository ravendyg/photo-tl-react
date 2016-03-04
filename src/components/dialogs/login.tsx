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

export = class LoginDialog extends ListeningComponent {
    private _open: any;
    protected needToReRender: any;
    
    private _username: any;
    private _pas: any;
    private _rem: any;
    
    constructor () {
        super(store);
        
        this._open = store.getState().dialogs.in;
    }
    
    protected trackRenderDependecies () {
        this.needToReRender = {
            dialogs: store.getState().dialogs,
        };
    }

    closeModal () {
        UserActions.hideSignin();
    }

    render () {
        this._open = store.getState().dialogs.in;
        let username = this._username;
        let pas = this._pas;
        let rem = this._rem;
        
        return (
            <Modal
                isOpen={this._open}
                onRequestClose={() => this.closeModal()}
                style={customStyles}
            >
                <Toolbar>
                    <Title title={'SignIn'} />
                </Toolbar>
                <TextField
                    hintText="User name"
                    multiline={false}
                    ref={node => {
                        username = node;
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
                <Toggle
                    label="Remember"
                    defaultToggled={false}
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
                    label="Signin"
                    onClick={() => {
                        UserActions.signin(
                            username.input.value,
                            pas.input.value,
                            rem.isToggled()
                        );
                    }}
                />
            </Modal>
        );
    }
}

        // <Dialog
        //   title="Dialog With Actions"
        //   actions={actions}
        //   modal={false}
        //   open={this.state.open}
        //   onRequestClose={this.handleClose}
        //   style={{display: 'none'}}
        // >
        //   The actions in this window were passed in as an array of React objects.
        // </Dialog>