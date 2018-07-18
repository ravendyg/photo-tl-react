import * as React from 'react';
import { TUser } from '../../../typings/types';
import { IUserActions } from '../../../typings/interfaces';

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;

const Popover = vendor.mUi.Popover;
const MenuItem = vendor.mUi.MenuItem;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import {menuItems} from './menu-items';

interface IProps {
    title: string;
    label: string;
    hash: string;
    user: TUser;
}

interface IState {
    userMenu: {
        open: boolean,
        anchorEl: any
    }
}
export class UserToolbarDesktop extends React.Component<IProps, IState> {

    private displayedButton: any;

    constructor(props) {
        super(props);

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
                open: false,
                anchorEl: null
            }
        });
    }

    private _signout() {
        UserActions.signout();
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
                        label={this.props.user.name}
                    />
                    <Popover
                        open={userMenu.open}
                        anchorEl={userMenu.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={event => this._closeUserMenu()}
                    >
                        <div style={{padding: `20px`}}>
                            {menuItems.filter(e => filter * e.disp <= 0).map( e =>
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
