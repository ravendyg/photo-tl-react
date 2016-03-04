/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;
const Link = vendor.ReactRouter.Link

// ui
const Toolbar = vendor.mUi.Toolbar;
const ToolbarGroup = vendor.mUi.ToolbarGroup;
const RaisedButton = vendor.mUi.RaisedButton;

const Title = require('./title.tsx');

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

// data
const store: IStore = require('./../../store.ts');

export class AppToolbar extends React.Component {
    constructor(){ super();}
    
    render() {
        if (!store.getState().user.name) {
            // no user
            return (
                <Toolbar>
                    <Title title={'Photoalbum'}/>
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
                    <Title  title={'Photoalbum'}/>
                    <ToolbarGroup float="left">
                        <span>All photos</span>
                        <RaisedButton
                            label="My photos"
                            onClick={() => {  
                                UserActions.displaySignup();
                            }}
                        />
                    </ToolbarGroup>
                </Toolbar>
            )
        } 
    }
}