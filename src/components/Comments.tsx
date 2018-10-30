import * as React from 'react';
import { observer } from 'mobx-react';
import { IComment, IDeps } from '../types';

interface ICommentProps {

}

export class Comment extends React.PureComponent<ICommentProps, {}> {
    render() {
        return null;
    }
}

interface ICommentListProps {
    deps: IDeps;
    iid: string;
}

@observer
export class CommentList extends React.PureComponent<ICommentListProps, {}> {
    componentWillMount() {

    }

    render() {
        const {
            deps: {
                commonStore
            }
        } = this.props;

        return 'comments';
    }
}
