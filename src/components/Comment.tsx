import * as React from 'react';
import {
    IComment,
    IUser,
} from '../types';
import {
    EBtnSize,
    EBtnType,
    Btn,
} from './Btn';

const commentWrapperStyle = {
    padding: '1rem',
};

const textBtnWrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '0.5rem',
};

const textStyle = {
    flexGrow: 1,
};

const btnWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
}

interface ICommentProps {
    content: IComment,
    user: IUser,
    onDelete: (cid: string) => void;
}

export class Comment extends React.PureComponent<ICommentProps, {}> {
    handleDelete = () => {
        const {
            content: {
                cid,
            },
            onDelete,
        } = this.props;
        onDelete(cid);
    }

    render() {
        const {
            content: {
                date,
                text,
                userName,
                uid,
            },
            user,
        } = this.props;
        return <div style={commentWrapperStyle}>
            <div>{`${userName} - ${(new Date(date)).toLocaleString()}`}</div>
            <div style={textBtnWrapperStyle}>
                <div style={textStyle}>{text}</div>
                {(user.uid === uid) &&
                    <div style={btnWrapperStyle}>
                        <Btn
                            action={this.handleDelete}
                            label='X'
                            size={EBtnSize.SMALL}
                            type={EBtnType.WARNING}
                        />
                    </div>
                }
            </div>
        </div>
    }
}
