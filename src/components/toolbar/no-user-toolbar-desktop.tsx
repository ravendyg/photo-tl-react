import * as React from 'react';
import { IUserActions } from '../../../typings/interfaces';

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarTitle = vendor.mUi.ToolbarTitle;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;


export class NoUserToolbarDesktop extends React.Component<{}, {}> {
    render() {
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
    }
}
