import * as React from 'react';
import { TImage } from '../../../typings/types';
import {
    IUserActions,
    IStore
} from '../../../typings/interfaces';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import {ListeningComponent} from './../listening-component';

import {PhotoCard} from './../card/photo-card';

import {EditPhotoDialog} from './../dialogs/edit-photo';

// data
const store: IStore = require('./../../store.ts').Store;

interface IProps {
    filter: string;
}

interface IState {
    photos: TImage [];
    commentsDisplayed: string;
};

export class PhotoList extends ListeningComponent<IProps, IState> {

    constructor(props) {
        super(props);
        this.state = {
            photos: store.getState().photos,
            // nothing displayed by default
            commentsDisplayed: ``
        };
        this.oldState = this.state;
    }

    componentWillMount () {
        // props are not accessible in the constructor
        this.transformState();
    }

    // @Override
    protected transformState () {
        if (this.props.filter === `my`) {
            // select only photos uploaded by the current user
            let ph = this.oldState.photos.filter(e => e.uploadedBy.uid === store.getState().user.uid);
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

    private editPhoto(iid: string) {
        UserActions.displayPhotoEdit(iid);
    }

    render() {
        return (
        <div>
            {this.state.photos.map((photo, i) =>
                <PhotoCard
                    key={photo.iid}
                    photo={photo}
                    user={store.getState().user}
                    editPhoto={this.editPhoto}
                    showComs={this.state.commentsDisplayed}
                    toggleComments={(_id: string) => this._toggleComments(_id)}
                    vote={UserActions.vote}
                    deletePhoto={UserActions.deletePhoto}/>
            )}
            <EditPhotoDialog />
        </div>
        )
    }
}
