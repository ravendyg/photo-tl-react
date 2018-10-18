import * as React from 'react';
import { IImageExtended } from '../../../typings/types';
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

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

interface IProps {
    filter: string;
}

interface IState {
    photos: IImageExtended [];
    commentsDisplayed: string;
};

export class PhotoList extends ListeningComponent<IProps, IState> {
    private observer: IntersectionObserver;

    constructor(props) {
        super(props);
                        // check compatibility
        this.observer = IntersectionObserver
            // don't watch user's own images
            && new IntersectionObserver(this._registerView, observerOptions);

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

    private _toggleComments = (cid: string) => {
        if (this.state.commentsDisplayed === cid) {
            // hide
            this.setState({commentsDisplayed: ``});
        } else {
            // show selected
            this.setState({commentsDisplayed: cid});
        }
    }

    private _registerView = (entries: IntersectionObserverEntry[]) => {
        const {
            observer,
        } = this;
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const { iid } = (entry.target as HTMLElement).dataset;
                console.log(iid);
                if (iid) {
                    if (observer) {
                        observer.unobserve(entry.target);
                    }
                    UserActions.registerView(iid);
                }
            }
        }
    };

    private editPhoto(iid: string) {
        UserActions.displayPhotoEdit(iid);
    }

    private _handleScrollEnd = (ev: any) => {
        console.log(ev);
    };

    render() {
        return (
        <div>
            {this.state.photos.map((photo) =>
                <PhotoCard
                    key={photo.iid}
                    photo={photo}
                    user={store.getState().user}
                    editPhoto={this.editPhoto}
                    showComs={this.state.commentsDisplayed}
                    toggleComments={this._toggleComments}
                    vote={UserActions.vote}
                    deletePhoto={UserActions.deletePhoto}
                    observer={this.observer}
                />
            )}
            <EditPhotoDialog />
        </div>
        )
    }
}
