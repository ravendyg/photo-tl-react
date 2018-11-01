import * as React from 'react';

const commentWrapperStyle = {
    padding: '1rem',
};

interface ICommentProps {

}

export class Comment extends React.PureComponent<ICommentProps, {}> {
    render() {
        return <div style={commentWrapperStyle}>
            Comment
        </div>
    }
}
