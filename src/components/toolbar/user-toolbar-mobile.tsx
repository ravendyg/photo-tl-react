import * as React from 'react';
import {TUser} from '../../../typings/types';
import { IUserActions } from '../../../typings/interfaces';

import * as FlatButton from 'material-ui/lib/flat-button';
import * as ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import * as Toolbar from 'material-ui/lib/toolbar/toolbar';
import * as ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import * as MenuItem from 'material-ui/lib/menus/menu-item';
import * as Popover from 'material-ui/lib/popover/popover';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import {menuItems} from './menu-items';

interface IProps {
    title: string;
    hash: string;
    user: TUser;
}

interface IState {
    userMenu: {
        open: boolean,
        anchorEl: any
    }
}
export class UserToolbarMobile extends React.Component<IProps, IState> {
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
                            {menuItems.filter(e => !e.text.toLowerCase().match(title.toLowerCase())).map( e =>
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
