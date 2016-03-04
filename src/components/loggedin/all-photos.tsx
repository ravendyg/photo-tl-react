/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

var Link = vendor.ReactRouter.Link

export class AllPhotos extends React.Component {
    constructor(){ super();}
    render() {
        return (
        <div>
            All photos
            <Link to="/">Logout</Link>
        </div>
        )
    }
}