import * as React from 'react';
import {EStarFill, StartIcon} from './Icons/StarIcon';

const ratingStyle = {

};

const arr = [1, 2, 3, 4, 5];

interface IRatingProps {
    average: number;
    rating: number;
    onRatingChange: (newRating: number) => void;
}

export class Rating extends React.PureComponent<IRatingProps, {}> {
    handleClick = this.props.onRatingChange;

    render() {
        const {average, rating} = this.props;
        const floorRating = Math.floor(rating);
        const ceilRating = Math.ceil(rating);

        return (
            <div style={ratingStyle}>
                {arr.map(count => {
                    let type;
                    if (count <= floorRating) {
                        type = EStarFill.FULL;
                    } else if (count === ceilRating && floorRating !== ceilRating) {
                        type = EStarFill.HALF
                    } else {
                        type = EStarFill.EMPTY;
                    }
                    return <StartIcon
                        clickable
                        key={count}
                        onClick={() => this.handleClick(count)}
                        size={1.5}
                        type={type}
                    />;
                })}
                <span>{`${rating || '--'} / ${average || '--'}`}</span>
            </div>
        );
    }
}
