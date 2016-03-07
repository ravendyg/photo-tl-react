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


export class UserToolbar extends React.Component {
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
    }
    
    render() {
        let title = this.props.title;
        let filter: number;
        let userMenu = this.state.userMenu;
        
        if (title === `Data`) {
            filter = -1;
            this.displayedButton = null;   
        } else {
            filter = 1;
            this.displayedButton =
                <ToolbarGroup>
                    <RaisedButton
                        label={this.props.label}
                        onClick={ () => {location.hash = this.props.hash} }
                    />
                </ToolbarGroup>
        }

        return (
            <Toolbar>
                {this.displayedButton}
                
                <ToolbarTitle text={title}/>
                
                <ToolbarGroup float="right">
                    <RaisedButton
                        onClick={event => this._openUserMenu(event)}
                        label={this.props.userName}
                    />
                    <Popover
                        open={userMenu.open}
                        anchorEl={userMenu.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={event => this._closeUserMenu()}
                    >
                        <div style={{padding: `20px`}}>
                            {this.menuItems.filter(e => filter * e.disp <= 0).map( e => 
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