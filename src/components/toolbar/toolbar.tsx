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

export class AppToolbar extends React.Component {
    constructor(){
        super();
        
        this.state = {
            open: false,
        };
    }
    
    private _openUserMenu (event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });    
    }
    
    private _closeUserMenu () {
        this.setState({
            open: false
        });    
    }
    
    private _signout (username: string) {
        UserActions.signout(username);
        this._closeUserMenu();
    }
    
    render() {
        let username = store.getState().user.name; 
        if (!username) {
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
                        label={username}
                        />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={event => this._closeUserMenu()}
                        >
                            <div style={{padding: `20px`}}>
                                <MenuItem primaryText="User data"/>
                                <MenuItem
                                    primaryText="SignOut"
                                    onClick={ () => this._signout(username)}
                                />
                            </div>
                        </Popover>
                    </ToolbarGroup>
                </Toolbar>
            )
        } 
    }
}