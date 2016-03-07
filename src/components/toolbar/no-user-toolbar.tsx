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

import {ListeningComponent} from './../listening-component.ts';

export class NoUserToolbar extends ListeningComponent {
   
    constructor(){
        super();   
    }
    
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