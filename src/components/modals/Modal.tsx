import * as React from 'react';
import {observer} from 'mobx-react';
import {IDeps} from '../../types';
import {EditPhotoModal} from './EditPhoto';
import {CommentsModal} from './Comments';

interface IModalProps {
    deps: IDeps;
}

@observer
export class Modal extends React.Component<IModalProps, {}> {
    render() {
        const {deps} = this.props;
        const {
            commonStore: {
                modal,
            },
        } = deps;

        switch (modal) {
            case 'edit-photo':
                return <EditPhotoModal deps={deps}/>;

            case 'comments':
                return <CommentsModal deps={deps}/>;

            default:
                return null;
        }
    }
}
