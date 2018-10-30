import * as React from 'react';
import { IDeps, IPhoto } from '../types';
import { CommentIcon } from './Icons/CommentIcon';
import { EditIcon } from './Icons/EditIcon';
import { EyeIcon } from './Icons/EyeIcon';
import { CommentList } from '../components/Comments';
import { Rating } from './Rating';

const cardStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
};

const imageStyle = {
    width: '100%',
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
    display: 'flex',
    alignItems: 'center',
};

const ratingWrapperStyle = {
    flexGrow: 1,
    margingRight: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
};

interface IPhotoCardProps {
    deps: IDeps;
    photo: IPhoto;
    showComments: boolean;
}


export class PhotoCard extends React.PureComponent<IPhotoCardProps, {}> {
    handleRatingChange = (newRating: number) => {
        const {
            deps: {
                photoActions,
            },
            photo: {
                iid,
                userRating,
            },
        } = this.props;
        if (userRating !== newRating) {
            photoActions.changeRating(iid, newRating);
        };
    }

    render() {
        const {
            deps,
            photo: {
                commentCount,
                description,
                extension,
                iid,
                title,
                views,
                averageRating,
                userRating,
            },
            showComments,
        } = this.props;

        return (
            <div style={cardStyle}>
                <img
                    src={`/users_data/images/${iid}.${extension}`}
                    style={imageStyle}
                />
                <div style={titleStyle}>
                    {title}
                </div>
                <div style={descriptionStyle}>
                    {description}
                </div>
                <div style={actionPanelStyle}>
                    <div style={btnGroupStyle}>
                        <div style={actionItemStyle}>
                            <CommentIcon size={1.5} />
                            <span style={{ marginLeft: '1rem' }}>
                                {commentCount}
                            </span>
                        </div>
                        <div style={actionItemStyle}>
                            <EditIcon size={1.5} />
                        </div>
                        <div style={{ ...actionItemStyle, marginLeft: '0.5rem' }}>
                            <EyeIcon size={1.5} />
                            <span style={{ marginLeft: '0.5rem' }}>
                                {views}
                            </span>
                        </div>
                    </div>
                    <div style={ratingWrapperStyle}>
                        <Rating
                            onRatingChange={this.handleRatingChange}
                            rating={userRating}
                            average={averageRating}
                        />
                    </div>
                </div>
                {showComments && <CommentList
                    deps={deps}
                    iid={iid}
                />}
            </div>
        );
    }
}

