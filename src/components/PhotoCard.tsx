import * as React from 'react';
import {IPhoto} from '../types';

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
            <div>
                {photo.title}
            </div>
        );
    }
}
