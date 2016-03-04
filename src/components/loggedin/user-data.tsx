/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

var Link = vendor.ReactRouter.Link

export class UserData extends React.Component {
    constructor(){ super();}
    render() {
        return (
        <div>
            User data
            <Link to="/">Logout</Link>
        </div>
        )
    }
}