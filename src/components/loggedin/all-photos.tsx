/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

var Link = vendor.ReactRouter.Link

const store: IStore = require('./../../store.ts');

export class AllPhotos extends React.Component {
    constructor(){ super();}
    render() {
        console.log(store.getState().user);
        return (
            <div>
                All photos
                <Link to="/">Logout</Link>
            </div>
        )
    }
}