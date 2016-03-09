/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;

const FlatButton = vendor.mUi.FlatButton;

const Popover = vendor.mUi.Popover;
const MenuItem = vendor.mUi.MenuItem;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;


export class NoUserToolbarMobile extends React.Component {
    protected setState: (state: any) => void;
    protected state: {
        userMenu: {
            open: boolean,
            anchorEl: any    
        }
    }
   
    constructor(){
        super(); 
        
        this.state = {
            userMenu: {
                open: false,
                anchorEl: null
            }
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
    
    render() {
        let userMenu = this.state.userMenu;
        
        return (
            <Toolbar>
                <ToolbarTitle text={'Photoalbum'}/>
                <ToolbarGroup float="right">
                    <FlatButton
                        onClick={event => this._openUserMenu(event)}
                        style={{minWidth: `44px`, marginRight: `0`}}>
                        <i  className={`fa fa-ellipsis-v`}></i>
                    </FlatButton>
                    <Popover
                        open={userMenu.open}
                        anchorEl={userMenu.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={event => this._closeUserMenu()}
                    >
                        <div style={{padding: `20px`}}>
                            <MenuItem
                                primaryText="SignIn"
                                onClick={() => {
                                    UserActions.displaySignin();
                                    this._closeUserMenu();
                                }} />
                            <MenuItem
                                primaryText="SignUp"
                                onClick={() => {
                                    UserActions.displaySignup();
                                    this._closeUserMenu();
                                }} />    
                        </div>
                    </Popover>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}