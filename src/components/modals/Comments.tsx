import * as React from 'react';
import {observer} from 'mobx-react';
import {ModalWrapper} from './ModalWrapper';
import {EInputType, Input} from '../Input';
import {
    EBtnSize,
    EBtnType,
    Btn,
} from '../Btn';
import {ModalHeader} from './ModalHeader';
import {IFooterActionType, ModalFooter} from './ModalFooter';
import {IDeps} from '../../types';
import {Comment} from '../Comment';

const modalBodyStyle = {
    padding: '0 0.5rem',
    minWidth: '400px',
};

const addCommentBlockStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
};

const addInputWrapperStyle = {
    flexGrow: 1,
};

const addBtnWrapperStyle = {
    padding: '1rem 0 1rem 1rem',
};

interface ICommentsModalProps {
    deps: IDeps;
}

interface ICommentsModalState {
    text: string;
}

@observer
export class CommentsModal extends React.Component<ICommentsModalProps, ICommentsModalState> {
    constructor(props: ICommentsModalProps) {
        super(props);
        const {
            deps: {
                commentActions,
                commentStore: {
                    commentsDisplayedFor,
                },
            }
        } = this.props;
        if (commentsDisplayedFor) {
            commentActions.getComments(commentsDisplayedFor);
        }

        this.state = {
            text: '',
        };
    }

    handleChangeText = (text: string) => {
        this.setState({ text });
    }

    handleClose = () => {
        const {
            deps: {
                commentActions,
            },
        } = this.props;
        commentActions.hideComments();
    }

    handleAdd = () => {
        const { text } = this.state;
        const {
            deps: {
                commentActions,
                commentStore: {
                    commentsDisplayedFor,
                },
            },
        } = this.props;

        if (commentsDisplayedFor && text) {
            commentActions.addComment(commentsDisplayedFor, text);
            this.handleChangeText('');
        }
    }

    handleDelete = (cid: string) => {
        console.log(cid);
    }

    render() {
        const { text } = this.state;
        const {
            deps: {
                commentStore: {
                    comments,
                },
            }
        } = this.props;
        const headerText = 'Comments';
        const actions: IFooterActionType[] = [
            {
                action: this.handleClose,
                disabled: false,
                label: 'Close',
                type: EBtnType.SECONDARY,
            },
        ];

        return (
            <ModalWrapper onOverlayClick={this.handleClose}>
                <ModalHeader text={headerText}/>
                <div className="modal-body" style={modalBodyStyle}>
                    <div style={addCommentBlockStyle}>
                        <div style={addInputWrapperStyle}>
                            <Input
                                expand={true}
                                type={EInputType.TEXT}
                                value={text}
                                onChange={this.handleChangeText}
                            />
                        </div>
                        <div style={addBtnWrapperStyle}>
                            <Btn
                                action={this.handleAdd}
                                disabled={!text}
                                label='Post'
                                size={EBtnSize.SMALL}
                            />
                        </div>
                    </div>
                    <div>
                        {comments.map(comment => <Comment key={comment.cid}  content={comment}/>)}
                    </div>
                </div>
                <ModalFooter actions={actions}/>
            </ModalWrapper>
        );
    }
}
