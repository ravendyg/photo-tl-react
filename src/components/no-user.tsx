/// <reference path="../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Link = vendor.ReactRouter.Link

const LoginDialog = require('./dialogs/login.tsx');

export class NoUser extends React.Component {
    constructor(){ super();}
    
    render() {
        return (
        <div>
            No user
            <ul>
                <li><Link to={`/loggedin/all-photos`}>All</Link></li>
                <li><Link to={`/loggedin/my-photos`}>My</Link></li>
                <li><Link to={`/loggedin/user-data`}>Data</Link></li>
                <li><Link to={`/loggedin/werew`}>Somewhere loggedin</Link></li>
                <li><Link to={`/werew`}>Somewhere loggedout</Link></li>
            </ul>
            <LoginDialog name={'login'}/>
        </div>
        )
    }
}