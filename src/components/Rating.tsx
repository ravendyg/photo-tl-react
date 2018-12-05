import * as React from 'react';
import {EStarFill, StartIcon} from './Icons/StarIcon';

const ratingStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
};

const arr = [1, 2, 3, 4, 5];

interface IRatingProps {
    average: string;
    rating: string;
    onRatingChange: (newRating: number) => void;
}

export class Rating extends React.PureComponent<IRatingProps, {}> {
    handleClick = this.props.onRatingChange;

    render() {
        const {average, rating} = this.props;
        const numRating = +rating;
        const floorRating = Math.floor(numRating);
        const ceilRating = Math.ceil(numRating);
        let averageStr = average;
        if (average[2] === '0') {
            averageStr = average[0];
        }

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
                <span>{`${rating || '--'} / ${averageStr || '--'}`}</span>
            </div>
        );
    }
}
