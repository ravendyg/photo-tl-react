import * as React from 'react';
import {observer} from 'mobx-react';
import {IDeps} from '../types';

interface IModalWrapper {
    deps: IDeps;
}

@observer
export class ModalWrapper extends React.Component<IModalWrapper, {}> {
    render() {
        return null;
    }
}
