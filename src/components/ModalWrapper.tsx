import * as React from 'react';
import {observer} from 'mobx-react';
import {IDeps} from '../types';
import {AddPhotoModal} from './modals/AddPhoto';

const wrapperStyle = {

};

interface IModalWrapper {
    deps: IDeps;
}

@observer
export class ModalWrapper extends React.Component<IModalWrapper, {}> {
    render() {
        const {
            deps: {
                commonStore,
            },
        } = this.props;

        if (commonStore.modal === null) {
            return null;
        }

        let content: JSX.Element | null = null;

        switch (commonStore.modal) {
            case "add": {
                content = <AddPhotoModal/>;
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
