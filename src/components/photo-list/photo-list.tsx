/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

import {ListeningComponent} from './../listening-component.ts';

import {Preloader} from './../preloader.tsx';

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
    
    private _showCards (): void {           
        if (!this._display.reduce( (i, j) => i * j, 1)) {
            setTimeout( () => {
                // 1 - loaded, show
                // 0 - loading, don't
                // -1 - error, don't
                this.setState({
                    display: this._display.map(e => e>0 ? `block` : `none`)
                });
            }, 1000);
        } else {
console.log(`done`);
            this._preloader = null;
        }
    }
    
    render() {
        this._preloader = <Preloader />; 
        let cardStyle = (window.innerWidth>600) ? {marginTop: `1%`, marginLeft: `5%`, marginRight: `5%`} : {};
        
        // start checking downloaded images
        this._showCards();

        return (
        <div>        
            {this._preloader}
            {this.state.photos.map( (e, i) =>
                <div style={cardStyle}>
                    <Card key={e._id} style={{display: this.state.display[i]}}> 
                        <CardMedia
                            overlay={<CardTitle title={e.title} />} >
                            <img
                                src={`users_data/images/${e.src}`}
                                onLoad={() => { this._display[i] = 1; }}  
                                onError={() => { this._display[i] = -1; }} />
                        </CardMedia>
                        
                        <span>ratings</span>
                        
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
                            <FlatButton><i className="material-icons">delete_forever</i></FlatButton>
                        </CardActions>
                        
                        <div>Added: <strong>{e.uploadedBy}</strong> - {e.uploaded}</div>
                        
                        <div style={{display: e.changed ? `` : `none`}}>
                            Edited: <strong>{e.changedBy}</strong> - {e.changed}
                        </div>
                        
                        <CardText>{e.description}</CardText>
                    </Card>  
                </div>
            )}
        </div>
        )
    }
}