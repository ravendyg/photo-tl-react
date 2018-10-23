import * as React from 'react';

const ratingStyle = {

};

interface IRatingProps {

}

export class Rating extends React.PureComponent<IRatingProps, {}> {
    render() {
        return (
            <div style={ratingStyle}>rating</div>
        );
    }
}
