import * as React from 'react';
import { IUserActions } from '../../../typings/interfaces';

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;

const FlatButton = vendor.mUi.FlatButton;

const Popover = vendor.mUi.Popover;
const MenuItem = vendor.mUi.MenuItem;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

interface IState {
    open: boolean,
    anchorEl: any
}

export class NoUserToolbarMobile extends React.Component<{}, IState> {

    private _openUserMenu (event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    private _closeUserMenu () {
        this.setState({
            open: false,
            anchorEl: null
        });
    }

    render() {
        const {anchorEl, open} = this.state;

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
                        open={open}
                        anchorEl={anchorEl}
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
