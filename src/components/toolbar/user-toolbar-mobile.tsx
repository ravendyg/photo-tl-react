/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;
const FlatButton = vendor.mUi.FlatButton;

const Popover = vendor.mUi.Popover;
const MenuItem = vendor.mUi.MenuItem;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;


export class UserToolbarMobile extends React.Component {
    protected setState: (state: any) => void;
    protected state: {
        userMenu: {
            open: boolean,
            anchorEl: any    
        }
    }
    
    private displayedButton: any;
    props: any;
    
    private menuItems: any [];
    
    constructor(){
        super();

        this.state = {
            userMenu: {
                open: false,
                anchorEl: null
            }
        }    
        
        this.menuItems = [{
            key: 1,
            text: `User data`,
            disp: -1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/user-data`;
            }
        },{
            key: 2,
            text: `All photos`,
            disp: 1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/all-photos`;
            }
        },{
            key: 3,
            text: `My photos`,
            disp: 1,
            click: () => {
                this._closeUserMenu();
                location.hash = `/loggedin/my-photos`;
            }
        },{
            key: 4,
            text: `SignOut`,
            disp: 0,
            click: () => {
                this._closeUserMenu();
                this._signout(this.props.userName);
            }
        }];
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
    }
    
    render() {
        let title = this.props.title;
        let filter: number;
        let userMenu = this.state.userMenu;
        
        return (
            <Toolbar>
                
                <ToolbarTitle text={title}/>
                
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
                            {this.menuItems.filter(e => !e.text.toLowerCase().match(title.toLowerCase())).map( e => 
                                <MenuItem
                                    key={e.key}
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