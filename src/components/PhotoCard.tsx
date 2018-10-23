import * as React from 'react';
import {IPhoto} from '../types';
import {CommentIcon} from './Icons/CommentIcon';
import {EditIcon} from './Icons/EditIcon';
import {Rating} from './Rating';

const cardStyle = {
    maxWidth: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem',
};

const imageStyle = {
    maxWidth: '100%',
};

const titleStyle = {
    fontSize: '2rem',
    padding: '0.5rem',
};

const descriptionStyle = {
    padding: '0 0.5rem',
};

const actionPanelStyle = {
    padding: '0.5rem',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const btnGroupStyle = {
    width: '10rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
}

const actionItemStyle = {

};

const ratingWrapperStyle = {
    flexGrow: 1,
    textAlign: 'right',
    margingRight: '0.5rem',
};

interface IPhotoCardProps {
    photo: IPhoto;
}


export class PhotoCard extends React.PureComponent<IPhotoCardProps, {}> {
    render() {
        const {photo} = this.props;

        /** Card
         * title
         * photo
         * text
         * edit?    comments    rating
         */
        return (
            <div style={cardStyle}>
                <img
                    src={`/users_data/images/${photo.iid}.png`}
                    style={imageStyle}
                />
                <div style={titleStyle}>
                    {photo.title}
                </div>
                <div style={descriptionStyle}>
                    {photo.description}
                </div>
                <div style={actionPanelStyle}>
                    <div style={btnGroupStyle}>
                        <div style={actionItemStyle}>
                            <CommentIcon size={1.5}/>
                            {photo.commentCount}
                        </div>
                        <div style={actionItemStyle}>
                            <EditIcon size={1.5}/>
                        </div>
                    </div>
                    <div style={ratingWrapperStyle}>
                        <Rating/>
                    </div>
                </div>
            </div>
        );
    }
}

