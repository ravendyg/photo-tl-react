/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

import {Preloader} from './../preloader';
import {Rating} from './../rating/rating';
import {Comments} from './../comments/comments';

const Card = vendor.mUi.Card;
const CardActions = vendor.mUi.CardActions;
const CardHeader = vendor.mUi.CardHeader;
const CardMedia = vendor.mUi.CardMedia;
const CardText = vendor.mUi.CardText;
const CardTitle = vendor.mUi.CardTitle;

const FlatButton = vendor.mUi.FlatButton;
const Badge = vendor.mUi.Badge;


export class PhotoCard extends React.Component {
    protected setState: (state: any) => void;
    protected state: {
        displayCard: string,
        displayPreloader: string,
        displayComments: string
    };

    protected oldState: {
        displayCard: string,
        displayPreloader: string,
        displayComments: string
    };

    public props: {
        photo: ImageType,
        user: TUser,
        vote: (vote: number, _id: string) => void,
        delete: (_id: string) => void,
        showComs: string,
        toggleComments: (_id: string) => void,
        editPhoto: (iid: string) => void;
    }

    constructor(){
        super();

        this.state = {
            displayCard: `none`,
            displayPreloader: `block`,
            displayComments: `none`
        };
        this.oldState = {
            displayCard: `none`,
            displayPreloader: `block`,
            displayComments: `none`
        };
    }

    private _showCard (): void {
        this.setState({
            displayCard: `block`,
            displayPreloader: `none`,
        });
    }

    private _vote = (voteValue: number, _id: string) => {
        this.props.vote(voteValue, _id);
    }

    private _deletePhoto (_id: string) {
        this.props.delete(_id);
    }

    private _toggleComments () {
        this.setState({displayComments: ``});
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
            cardStyle = {marginTop: `1%`, marginLeft: `5%`, marginRight: `5%`};
            brr = null;
        } else {
            cardStyle = {};
            brr = <br />;
        }

        const {photo} = this.props;
        const {
            iid,
            comments,
            changed,
            description,
            uploaded,
            uploadedBy,
            title
        } = photo;

        return (
            <div style={cardStyle}>
                <Preloader show={this.state.displayPreloader} />
                <Card style={{display: this.state.displayCard}}>
                    <CardMedia
                        overlay={<CardTitle title={title} />} >
                        <img
                            src={`users_data/images/${iid + '.png'}`}
                            onLoad={() => { this._showCard(); }}/>
                    </CardMedia>

                    <div style={{textAlign: `right`, marginTop: `10px`}}>
                        <Rating
                            photo={photo}
                            title={`Rating: `}/>
                        {brr}
                        <Rating
                            photo={photo}
                            title={`My rating: `}
                            user={this.props.user}
                            onClick={this._vote}/>
                    </div>

                    <CardActions style={{
                        display: `flex`,
                        flexDirection: `row`,
                        flexWrap: `wrap`,
                        justifyContent: `space-around` }}>
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
                        <FlatButton onClick={() => { this._deletePhoto(iid);}}>
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
