/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const FlatButton = vendor.mUi.FlatButton;

const Utils: IUtils = require('./../../utils/utils.ts');

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
        deleteComment: (date: string) => void
    }
    
    constructor(){
        super();
        
        this.oldState = {
        };
    }
    
    private _deleteComment (date: string): void {
        this.props.deleteComment(date);
    }
    
    render() {     
        let com = this.props.comment;

        return (
            <div>
                <p>
                    Author: <strong>{(com.user===this.props.user) ? `You` : com.user}</strong>
                    <span>{Utils.formatDate(com.date)}</span>
                    <FlatButton
                        onClick={() => { this._deleteComment(com.date);}}
                        style={{display: (com.user===this.props.user) ? `` : `none`}}>
                        <i className="material-icons">delete_forever</i>
                    </FlatButton>
                </p>
                <p><em>{com.text}</em></p>
            </div>
        )
    }
}