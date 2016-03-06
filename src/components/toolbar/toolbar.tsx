/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const Link = vendor.ReactRouter.Link

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;

const DropDownMenu = vendor.mUi.DropDownMenu;
const MenuItem = vendor.mUi.MenuItem;

const Popover = vendor.mUi.Popover;

// const Title = require('./title.tsx');

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts');

import {ListeningComponent} from './../listening-component.ts';

export class AppToolbar extends ListeningComponent {
    protected setState: (state: any) => void;
    protected state: {
        user: UserType;
        userMenu: {
            open: boolean,
            anchorEl: any    
        }
    }
    protected oldState: {
        user: UserType;
    }
    
    protected _store: IStore;
    
    constructor(){
        super();
        
        this.state = {
            user: this._store.getState().user,
            
            userMenu: {
                open: false,
                anchorEl: null
            }
        }
        this.oldState = {
            user: this._store.getState().user
            // userMenu doesn exist in old state because it's not a part of the global state
        }
    }
    
    private _openUserMenu (event) {
        this.setState({
            userMenu: {
                open: true,
                anchorEl: event.currentTarget
            }
        });
    }
    
    private _closeUserMenu () {
        this.setState({
            userMenu: {
                open: false
            }
        });    
    }
    
    private _signout (username: string) {
        UserActions.signout(username);
        this._closeUserMenu();
    }
    
    render() {
        if (!this.state.user.name) {
            // no user
            return (
                <Toolbar>
                    <ToolbarTitle text={'Photoalbum'}/>
                    <ToolbarGroup float="right">
                        <RaisedButton
                            label="SignIn"
                            onClick={() => {
                                UserActions.displaySignin();
                            }}
                        />
                        <RaisedButton
                            label="SignUp"
                            onClick={() => {
                                UserActions.displaySignup();
                            }}
                        />
                    </ToolbarGroup>
                </Toolbar>
            )
        } else {
            // loggedin
            return (
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton
                            label="All photos"
                            onClick={() => {  
                                UserActions.displaySignup();
                            }}
                        />
                        <RaisedButton
                            label="My photos"
                            onClick={() => {  
                                UserActions.displaySignup();
                            }}
                        />
                    </ToolbarGroup>
                    <ToolbarTitle text={'Photoalbum'}/>
                    <ToolbarGroup float="right">
                        <RaisedButton
                            onClick={event => this._openUserMenu(event)}
                            label={this.state.user.name}
                        />
                        <Popover
                            open={this.state.userMenu.open}
                            anchorEl={this.state.userMenu.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={event => this._closeUserMenu()}
                        >
                            <div style={{padding: `20px`}}>
                                <MenuItem primaryText="User data"/>
                                <MenuItem
                                    primaryText="SignOut"
                                    onClick={ () => {
                                        this._closeUserMenu();
                                        this._signout(this.state.user.name);
                                    }}
                                />
                            </div>
                        </Popover>
                    </ToolbarGroup>
                </Toolbar>
            )
        } 
    }
}