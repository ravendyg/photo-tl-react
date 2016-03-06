/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;

const Popover = vendor.mUi.Popover;
const MenuItem = vendor.mUi.MenuItem;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts');

import {ListeningComponent} from './../listening-component.ts';

export class UserToolbar extends ListeningComponent {
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
    
    private displayedButton: any;
    props: any;
    
    private menuItems: any [];
    
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
        
        this.menuItems = [{
            text: `User data`,
            disp: -1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/user-data`;
            }
        },{
            text: `All photos`,
            disp: 1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/all-photos`;
            }
        },{
            text: `My photos`,
            disp: 1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/my-photos`;
            }
        },{
            text: `SignOut`,
            disp: 0,
            click: () => {
                this._closeUserMenu();
                this._signout(this.state.user.name);
            }
        }]  
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
        let title: string;
        let filter: number = 1;
        if (this.props.mode === `data`) {
            this.displayedButton = null;
            title = `Data`;   
            filter = -1; 
        } else if (this.props.mode === `my-photos`) {
            this.displayedButton =
                <ToolbarGroup>
                    <RaisedButton
                        label="All photos"
                        onClick={ () => {location.hash = `/loggedin/all-photos`} }
                    />
                </ToolbarGroup>
            title = `My photos`;
        } else {
            this.displayedButton =
                <ToolbarGroup>
                    <RaisedButton
                        label="My photos"
                        onClick={ () => {location.hash = `/loggedin/my-photos`} }
                    />
                </ToolbarGroup>
            title = `All photos`;
        }
        
        return (
            <Toolbar>
                    {this.displayedButton}
                <ToolbarTitle text={title}/>
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
                            {this.menuItems.filter(e => filter * e.disp <= 0).map(e => 
                                <MenuItem
                                 primaryText={e.text}
                                 onClick={e.click}
                             />
                            )}
                        </div>
                    </Popover>
                </ToolbarGroup>
            </Toolbar>
        )
    } 
}

// <MenuItem
//                                 primaryText="User data"
//                                 onClick={ () => {location.hash = `/loggedin/user-data`} }
//                             />
//                             <MenuItem
//                                 primaryText="SignOut"
//                                 onClick={ () => {
//                                     this._closeUserMenu();
//                                     this._signout(this.state.user.name);
//                                 }}
//                             />