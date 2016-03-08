/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts');

import {Preloader} from './../preloader.tsx';

import {Rating} from './../rating/rating.tsx';

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
    };
        
    protected oldState: {
        displayCard: string,
        displayPreloader: string,
    };
    
    public props: {
        photo: ImageType,
        user: string,
        vote: (vote: number, _id: string) => void;
        delete: (_id: string) => void;
    }
    
    constructor(){
        super();
        
        this.state = {
            displayCard: `none`,
            displayPreloader: `block`,
        };
        this.oldState = {
            displayCard: `none`,
            displayPreloader: `block`,
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
    
    render() {
        let cardStyle = (window.innerWidth>600)
                ? {marginTop: `1%`, marginLeft: `5%`, marginRight: `5%`}
                : {};
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
                        <FlatButton><i className="material-icons">mode_edit</i></FlatButton>
                        <Badge
                            badgeContent={e.comments.length}
                            secondary={true}
                            badgeStyle={{top: 12, right: 12}} >
                            <FlatButton><i className="material-icons">comment</i></FlatButton>
                        </Badge>
                        <FlatButton onClick={() => { this._deletePhoto(e._id);}}>
                            <i className="material-icons">delete_forever</i>
                        </FlatButton>
                    </CardActions>
                    
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