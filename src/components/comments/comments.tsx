/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

const FlatButton = vendor.mUi.FlatButton;
const RaisedButton = vendor.mUi.RaisedButton;
const TextField = vendor.mUi.TextField;

import {Comment} from './../comments/comment.tsx';

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

export class Comments extends React.Component {
    protected setState: (state: any) => void;
    protected state: {
    };

    protected oldState: {
    };

    public props: {
        display: string,
        comments: CommentType [],
        user: string,
        id: string
    }

    constructor(){
        super();

        this.oldState = {
        };
    }

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
