import * as React from 'react';
import {
    TComment,
    TUser
} from '../../../typings/types';
import { IUtils } from '../../../typings/interfaces';

interface IProps {
    user: TUser,
    comment: TComment,
    deleteComment: (cid: string) => void
}

import * as FlatButton from 'material-ui/lib/flat-button';
const Utils: IUtils = require('./../../utils/utils.ts').Utils;

export class Comment extends React.Component<IProps, {}> {

    private _deleteComment = (): void => {
        const {
            deleteComment,
            comment: { cid }
        } = this.props;
        deleteComment(cid);
    };

    render() {
        let brr = (window.outerWidth > 500)
            ? null
            : <br />;
        const {
            comment,
            user
        } = this.props;

        return (
            <div>
                <p>
                    Author: <strong>{(comment.user.uid===user.uid) ? `You` : comment.user.name}</strong>
                    {brr}
                    <span>{Utils.formatDate(comment.date)}</span>
                    <FlatButton
                        onClick={this._deleteComment}
                        style={{display: (comment.user.uid===user.uid) ? `` : `none`,
                                float: `right`}}>
                        <i className="material-icons">delete_forever</i>
                    </FlatButton>
                </p>
                <p><em>{comment.text}</em></p>
            </div>
        )
    }
}
