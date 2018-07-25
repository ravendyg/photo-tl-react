import {
    IImageExtended,
    TUser
} from '../../../typings/types';
import { IUtils } from '../../../typings/interfaces';

interface IProps {
    photo: IImageExtended;
    user: TUser;
    vote: (vote: number, iid: string) => void;
    deletePhoto: (iid: string) => void;
    showComs: string;
    toggleComments: (_id: string) => void;
    editPhoto: (iid: string) => void;
    observer: IntersectionObserver;
}

interface IState {
    displayCard: string,
    displayPreloader: string,
    displayComments: string,
}

import * as React from 'react';

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

import {Preloader} from './../preloader';
import {Rating} from './../rating/rating';
import {Comments} from './../comments/comments';

import * as Card from 'material-ui/lib/card/card';
import * as CardActions from 'material-ui/lib/card/card-actions';
import * as CardMedia from 'material-ui/lib/card/card-media';
import * as CardText from 'material-ui/lib/card/card-text';
import * as CardTitle from 'material-ui/lib/card/card-title';
import * as FlatButton from 'material-ui/lib/flat-button';
import * as Badge from 'material-ui/lib/badge';

export class PhotoCard extends React.Component<IProps, IState> {
    protected oldState: IState;
    private item: HTMLElement;

    constructor(props: IProps){
        super(props);

        this.state = {
            displayCard: 'none',
            displayPreloader: 'block',
            displayComments: 'none',
        };
        this.oldState = {
            displayCard: 'none',
            displayPreloader: 'block',
            displayComments: 'none',
        };
    }

    private _showCard = (): void => {
        this.setState({
            displayCard: 'block',
            displayPreloader: 'none',
        });
        const {
            item,
            props: {
                photo: {
                    haveSeen,
                    uploadedBy,
                },
                observer,
                user,
            }
        } = this;
        if (user.uid !== uploadedBy.uid && item && observer && !haveSeen) {
            observer.observe(item);
        }
    };

    private _vote = (voteValue: number, _id: string) => {
        this.props.vote(voteValue, _id);
    }

    private _deletePhoto = (_id: string) => {
        const {
            photo: { iid },
            deletePhoto
        } = this.props
        deletePhoto(iid);
    }

    private _toggleComments () {
        this.setState({displayComments: ''});
    }

    private _editPhoto = () => {
        const {
            photo,
            editPhoto,
            user
        } = this.props;
        if (this._isUserPhotoAuthor) {
            editPhoto(photo.iid);
        }
    };

    private _isUserPhotoAuthor() {
        const {
            user,
            photo
        } = this.props;
        return user.uid === photo.uploadedBy.uid;
    }

    render() {
        let cardStyle, brr;
        if (window.outerWidth > 500) {
            cardStyle = {
                margin: '1% 5% 5%'
            };
            brr = null;
        } else {
            cardStyle = {};
            brr = <br />;
        }

        const { photo } = this.props;
        const {
            iid,
            comments,
            changed,
            description,
            uploaded,
            uploadedBy,
            title,
            views = 0,
        } = photo;

        return (
            <div
                style={cardStyle}
                ref={item => this.item = item}
                data-iid={iid}
            >
                <Preloader show={this.state.displayPreloader} />
                <Card style={{display: this.state.displayCard}}>
                    <CardMedia
                        overlay={<CardTitle title={title} />} >
                        <img
                            src={'users_data/images/' + iid + '.png'}
                            onLoad={this._showCard}/>
                    </CardMedia>

                    <div style={{textAlign: 'right', marginTop: '10px'}}>
                        <span>
                            <i className="fa fa-eye" style={{marginRight: '5px'}}></i>
                            <span style={{marginRight: '20px'}}>{views}</span>
                        </span>
                        <Rating
                            photo={photo}
                            title={'Rating: '}/>
                        {brr}
                        <Rating
                            photo={photo}
                            title={'My rating: '}
                            user={this.props.user}
                            onClick={this._vote}/>
                    </div>

                    <CardActions style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around' }}>
                        {this._isUserPhotoAuthor() && (
                            <FlatButton
                                onClick={this._editPhoto}>
                                <i className="material-icons">mode_edit</i>
                            </FlatButton>
                        )}
                        <Badge
                            badgeContent={comments.length}
                            secondary={true}
                            badgeStyle={{top: 12, right: 12}} >
                            <FlatButton
                                onClick={() => this.props.toggleComments(iid)}>
                                <i className="material-icons">comment</i>
                            </FlatButton>
                        </Badge>
                        <FlatButton onClick={this._deletePhoto}>
                            <i className="material-icons">delete_forever</i>
                        </FlatButton>
                    </CardActions>

                    <Comments
                        comments={comments}
                        display={this.props.showComs===iid}
                        user={this.props.user}
                        id={iid}/>

                    <div className='photo-card__metadata'>
                        <span className='photo-card__metadata-item'>
                            <strong>Author:</strong> {uploadedBy.name}
                        </span>
                        <span className='photo-card__metadata-item'>
                            <strong>Created:</strong> {Utils.formatDate(uploaded)}
                        </span>
                        {changed !== 0 && (
                            <span className='photo-card__metadata-item'>
                                <strong>Edited</strong>: {Utils.formatDate(changed)}
                            </span>
                        )}
                    </div>

                    <CardText>{description}</CardText>
                </Card>
            </div>
        )
    }
}
