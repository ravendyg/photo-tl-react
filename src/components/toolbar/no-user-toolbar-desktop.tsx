import * as React from 'react';
import { IUserActions } from '../../../typings/interfaces';

import * as RaisedButton from 'material-ui/lib/raised-button';
import * as ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import * as Toolbar from 'material-ui/lib/toolbar/toolbar';
import * as ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';


const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;


export class NoUserToolbarDesktop extends React.Component<{}, {}> {
    render() {
        return (
            <Toolbar>
                <ToolbarTitle text={'Photoalbum'}/>
                <ToolbarGroup float="right">
                    <RaisedButton
                        label="SignIn"
                        onClick={UserActions.displaySignin}
                    />
                    <RaisedButton
                        label="SignUp"
                        onClick={UserActions.displaySignup}
                    />
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
