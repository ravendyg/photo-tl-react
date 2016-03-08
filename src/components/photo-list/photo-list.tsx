/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts');

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

import {ListeningComponent} from './../listening-component.ts';

import {Preloader} from './../preloader.tsx';

import {PhotoCard} from './../card/photo-card.tsx';

import {Rating} from './../rating/rating.tsx';

const Card = vendor.mUi.Card;
const CardActions = vendor.mUi.CardActions;
const CardHeader = vendor.mUi.CardHeader;
const CardMedia = vendor.mUi.CardMedia;
const CardText = vendor.mUi.CardText;
const CardTitle = vendor.mUi.CardTitle;

const FlatButton = vendor.mUi.FlatButton;
const Badge = vendor.mUi.Badge;

// data
const store: IStore = require('./../../store.ts');

export class PhotoList extends ListeningComponent {
    protected setState: (state: any) => void;
    protected state: {
        photos: ImageType [],
        display: string []
    };
        
    protected oldState: {
        photos: ImageType []
    };
    
    public props: any;
       
    private _display: number [];   
    private _preloader: any;
    
    constructor(){
        super();
        
        this.oldState = {
            photos: store.getState().photos
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
            this._display = ph.map(e => 0);
            this.setState({
                photos: ph,
                display: ph.map(e => `none`)
            });
        } else {
            // just pass the photos
            this._display = this.oldState.photos.map(e => 0);
            this.setState({
                photos: this.oldState.photos,
                display: this.oldState.photos.map(e => `none`)
            });
        }
    }
    
    render() {
        this._preloader = <Preloader />;       

        return (
        <div>        
            {this.state.photos.map( (e, i) =>
                    <PhotoCard
                        key={e._id}
                        photo={e}
                        user={store.getState().user.name}
                        vote={(vote, _id) => UserActions.vote(vote, _id)}
                        delete={(_id) => UserActions.deletePhoto(_id)}/>
            )}
        </div>
        )
    }
}