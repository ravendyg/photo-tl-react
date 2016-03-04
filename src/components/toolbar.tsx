// /// <reference path="./../../typings/tsd.d.ts" />

// // vendor
// const React: IReact = vendor.React;
// const Link = vendor.ReactRouter.Link

// // ui
// const AppBar = vendor.mUi.AppBar;
// const Toolbar = vendor.mUi.Toolbar;
// const ToolbarGroup = vendor.mUi.ToolbarGroup;
// const RaisedButton = vendor.mUi.RaisedButton;

// const Title = require('./title.tsx');

// const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;
// console.log(UserActions);

// // data

// console.log(1);
// const store: IStore = require('./../../store.ts');

// export class AppToolbar extends React.Component {
//     constructor(){ super();}
    
//     render() {
//         if (!store.getState().user.name) {
//             // no user
//             return (
//                 <Toolbar>
//                     <Title />
//                     <ToolbarGroup float="right">
//                         <RaisedButton
//                             label="SignIn"
//                             onClick={() => {
//                                 UserActions.signin();
//                             }}
//                         />
//                         <RaisedButton
//                             label="SignUp"
//                             onClick={() => {
//                                 UserActions.signup();
//                             }}
//                         />
//                     </ToolbarGroup>
//                 </Toolbar>
//             )
//         } else {
//             // loggedin
//             return (
//                 <Toolbar>
//                     <Title />
//                     <ToolbarGroup float="left">
//                         <span>All photos</span>
//                         <RaisedButton
//                             label="My photos"
//                             onClick={() => {  
//                                 UserActions.signup();
//                             }}
//                         />
//                     </ToolbarGroup>
//                 </Toolbar>
//             )
//         } 
//     }
// }