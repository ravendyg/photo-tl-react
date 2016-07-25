/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import {ListeningComponent} from './../listening-component.ts';

import {PhotoCard} from './../card/photo-card.tsx';

import {EditPhotoDialog} from './../dialogs/edit-photo.tsx';

// data
const store: IStore = require('./../../store.ts').Store;

export class PhotoList extends ListeningComponent {
    protected setState: (state: any) => void;
    protected state: {
        photos: ImageType [],
        commentsDisplayed: string
    };

    protected oldState: {
        photos: ImageType [],
        commentsDisplayed: string
    };

    public props: any;

    private _preloader: any;

    constructor(){
        super();

        this.oldState = {
            photos: store.getState().photos,
            // nothing displayed by default
            commentsDisplayed: ``
        };
    }

    componentWillMount () {
        // props are not accessible in the constructor
        this.transformState();
    }

    // @Override
    protected transformState () {
        if (this.props.filter === `my`) {
            // select only photos uploaded by the current user
            let ph = this.oldState.photos.filter(e => e.uploadedBy === store.getState().user.name);
            this.setState({
                photos: ph
            });
        } else {
            // just pass the photos
            this.setState({
                photos: this.oldState.photos
            });
        }
    }

    private _toggleComments (_id: string) {
        if (this.state.commentsDisplayed === _id) {
            // hide
            this.setState({commentsDisplayed: ``});
        } else {
            // show selected
            this.setState({commentsDisplayed: _id});
        }
    }

    private _editPhoto (_id: string) {
        UserActions.displayPhotoEdit(_id);
    }

    render() {
        return (
        <div>
            {this.state.photos.map( (e, i) =>
                    <PhotoCard
                        key={e._id}
                        photo={e}
                        user={store.getState().user.name}
                        editPhoto={() => { this._editPhoto(e._id)} }
                        showComs={this.state.commentsDisplayed}
                        toggleComments={(_id: string) => this._toggleComments(_id)}
                        vote={(vote, _id) => UserActions.vote(vote, _id)}
                        delete={(_id) => UserActions.deletePhoto(_id)}/>
            )}
            <EditPhotoDialog />
        </div>
        )
    }
}