import * as React from 'react';
import {observer} from 'mobx-react';
import {IDeps} from '../types';
import {EditPhotoModal} from './modals/EditPhoto';

const wrapperStyle = {

};

interface IModalWrapper {
    deps: IDeps;
}

@observer
export class ModalWrapper extends React.Component<IModalWrapper, {}> {
    render() {
        const {deps} = this.props;
        const {commonStore} = deps;

        if (commonStore.modal === null) {
            return null;
        }

        let content: JSX.Element | null = null;

        switch (commonStore.modal) {
            case 'edit-photo': {
                content = <EditPhotoModal deps={deps}/>;
                break;
            }

            default: {
                content = null;
                break;
            }
        }

        return (
            <div style={wrapperStyle}>
                {content}
            </div>
        );
    }
}
