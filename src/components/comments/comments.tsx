import * as React from 'react';
import { TComment, TUser } from '../../../typings/types';
import { IUserActions } from '../../../typings/interfaces';

import * as FlatButton from 'material-ui/lib/flat-button';
import * as RaisedButton from 'material-ui/lib/raised-button';
import * as TextField from 'material-ui/lib/text-field';

import {Comment} from './../comments/comment';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

interface IProps {
    display: boolean,
    comments: TComment [],
    user: TUser,
    id: string
}

export class Comments extends React.Component<IProps, {}> {
    private _post (input: any) {
        UserActions.postComment(this.props.id, input.getInputNode().value);
        input.setValue(``);
    }

    private _deleteComment = (cid: string) => {
        UserActions.deleteComment(this.props.id, cid);
    };

    render() {
        let postInput: any;

        return (
            <div style={{
                display: (this.props.display) ? `` : `none`,
                marginLeft: `15px`
            }}>
                <TextField
                    hintText="New Comment"
                    multiLine={true}
                    rows={1}
                    rowsMax={6}
                    fullWidth={true}
                    ref={node => {
                        postInput = node;
                    }}
                />
                <div style={{textAlign: `right`}}>
                    <FlatButton
                        style={{marginRight: '15px'}}
                        label={`Clear`}
                        onClick={() => {
                            postInput.input.setValue(``);
                        }}
                    />
                    <RaisedButton
                        style={{marginRight: '15px'}}
                        label={`Post`}
                        onClick={() => { this._post(postInput.input)}}
                    />
                </div>
                <br />
                {this.props.comments.sort( (e1,e2) => {
                    if (e1.date < e2.date) return 1;
                    if (e1.date > e2.date) return -1;
                    return 0;
                }).map( (cm, i) =>
                    <Comment
                        key={i}
                        user={this.props.user}
                        comment={cm}
                        deleteComment={this._deleteComment}/>
                )}
            </div>
        )
    }
}
