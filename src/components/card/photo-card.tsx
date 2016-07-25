/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

import {Preloader} from './../preloader.tsx';

import {Rating} from './../rating/rating.tsx';

import {Comments} from './../comments/comments.tsx';

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
        user: string,
        vote: (vote: number, _id: string) => void,
        delete: (_id: string) => void,
        showComs: string,
        toggleComments: (_id: string) => void,
        editPhoto: () => void;
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

    private _vote (vote: number, _id: string) {
        this.props.vote(vote, _id);
    }

    private _deletePhoto (_id: string) {
        this.props.delete(_id);
    }

    private _toggleComments () {
        this.setState({displayComments: ``});
    }

    private _editPhotoInfo () {
        this.props.editPhoto();
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

        let e = this.props.photo;

        return (
            <div style={cardStyle}>
                <Preloader show={this.state.displayPreloader} />
                <Card style={{display: this.state.displayCard}}>
                    <CardMedia
                        overlay={<CardTitle title={e.title} />} >
                        <img
                            src={`users_data/images/${e.src}`}
                            onLoad={() => { this._showCard(); }}/>
                    </CardMedia>

                    <div style={{textAlign: `right`, marginTop: `10px`}}>
                        <Rating
                            rating={e.rating}
                            title={`Rating: `}/>
                        {brr}
                        <Rating
                            rating={e.rating}
                            title={`My rating: `}
                            user={this.props.user}
                            onClick={vote => this._vote(vote, e._id)}/>
                    </div>

                    <CardActions style={{
                        display: `flex`,
                        flexDirection: `row`,
                        flexWrap: `wrap`,
                        justifyContent: `space-around` }}>
                        <FlatButton
                            onClick={() => {this._editPhotoInfo()}}>
                            <i className="material-icons">mode_edit</i>
                        </FlatButton>
                        <Badge
                            badgeContent={e.comments.length}
                            secondary={true}
                            badgeStyle={{top: 12, right: 12}} >
                            <FlatButton
                                onClick={() => this.props.toggleComments(e._id)}>
                                <i className="material-icons">comment</i>
                            </FlatButton>
                        </Badge>
                        <FlatButton onClick={() => { this._deletePhoto(e._id);}}>
                            <i className="material-icons">delete_forever</i>
                        </FlatButton>
                    </CardActions>

                    <Comments
                        comments={e.comments}
                        display={this.props.showComs===e._id}
                        user={this.props.user}
                        id={e._id}/>

                    <div>Added: <strong>{e.uploadedBy}</strong> - {Utils.formatDate(e.uploaded)}</div>

                    <div style={{display: e.changed ? `` : `none`}}>
                        Edited: <strong>{e.changedBy}</strong> - {Utils.formatDate(e.changed)}
                    </div>

                    <CardText>{e.description}</CardText>
                </Card>
            </div>
        )
    }
}