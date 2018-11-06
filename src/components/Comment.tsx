import * as React from 'react';
import {IComment} from '../types';

const commentWrapperStyle = {
    padding: '1rem',
};

interface ICommentProps {
    content: IComment
}

export class Comment extends React.PureComponent<ICommentProps, {}> {
    render() {
        const {
            content: {
                date,
                text,
                userName,
            },
        } = this.props;
        return <div style={commentWrapperStyle}>
            <div>{`${userName} - ${(new Date(date)).toLocaleString()}`}</div>
            <div>{text}</div>
        </div>
    }
}
