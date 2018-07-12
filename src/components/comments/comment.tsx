/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const FlatButton = vendor.mUi.FlatButton;

const Utils: IUtils = require('./../../utils/utils.ts').Utils;

const UserActions: IUserActions = require('./../../user-actions.ts').UserActions;

export class Comment extends React.Component {
    protected setState: (state: any) => void;
    protected state: {
    };

    protected oldState: {
    };

    public props: {
        user: string,
        comment: CommentType,
        deleteComment: (cid: string) => void
    }

    constructor(){
        super();

        this.oldState = {
        };
    }

    private _deleteComment = (cid: string): void => {
        this.props.deleteComment(cid);
    };

    render() {
        let brr = (window.outerWidth > 500)
            ? null
            : <br />;
        let com = this.props.comment;

        return (
            <div>
                <p>
                    Author: <strong>{(com.user===this.props.user) ? `You` : com.user}</strong>
                    {brr}
                    <span>{Utils.formatDate(com.date)}</span>
                    <FlatButton
                        onClick={this._deleteComment}
                        style={{display: (com.user===this.props.user) ? `` : `none`,
                                float: `right`}}>
                        <i className="material-icons">delete_forever</i>
                    </FlatButton>
                </p>
                <p><em>{com.text}</em></p>
            </div>
        )
    }
}
