import * as React from 'react';
import { IDeps, IPhoto } from '../types';
import { CommentIcon } from './Icons/CommentIcon';
import { EditIcon } from './Icons/EditIcon';
import { EyeIcon } from './Icons/EyeIcon';
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
    padding: '0 1.5rem',
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
    cursor: 'pointer',
};

const nameWrapperStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1rem',
};

const ratingWrapperStyle = {
    margingRight: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
};

interface IPhotoCardProps {
    deps: IDeps;
    edit: (photo: IPhoto) => void;
    photo: IPhoto;
}


export class PhotoCard extends React.PureComponent<IPhotoCardProps, {}> {
    edit = () => {
        const {
            edit,
            photo,
        } = this.props;
        edit(photo);
    }

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

    displayComments = () => {
        const {
            deps: {
                commentActions,
            },
            photo: {
                iid,
            },
        } = this.props;
        commentActions.showComments(iid);
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
                uploadedBy: {
                    name,
                    uid,
                },
                uploaded,
                changed,
            },
        } = this.props;
        const {
            userStore: {
                user,
            },
        } = deps;
        const isCreator = user && user.uid === uid;

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
                        <div style={actionItemStyle} onClick={this.displayComments}>
                            <CommentIcon size={1.5} />
                            <span style={{ marginLeft: '1rem' }}>
                                {commentCount}
                            </span>
                        </div>
                        {isCreator && (
                            <div
                                onClick={this.edit}
                                style={actionItemStyle}
                            >
                                <EditIcon size={1.5} />
                            </div>
                        )}
                        <div style={{
                                ...actionItemStyle,
                                marginLeft: '0.5rem',
                                cursor: 'initial',
                            }}
                        >
                            <EyeIcon size={2} />
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
                <div style={nameWrapperStyle}>
                    {`Published by ${name} at ${(new Date(uploaded)).toLocaleString()}.`
                        + (changed ? ` Changed at ${(new Date(changed)).toLocaleString()}.` : '')
                    }
                </div>
            </div>
        );
    }
}

