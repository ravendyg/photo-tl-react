import * as React from 'react';
import {Btn, EBtnType} from '../Btn';

export interface IFooterActionType {
    action: () => void;
    label: string;
    type: EBtnType;
}

interface IModalFooterProps {
    actions?: any[];
}

export class ModalFooter extends React.PureComponent<IModalFooterProps, {}> {
    render() {
        const {actions = []} = this.props;

        return (
            <div className="modal-footer">
                {actions.map(action => (
                    <Btn
                        key={action.label}
                        action={action.action}
                        label={action.label}
                        type={action.type}
                    />
                ))}
            </div>
        );
    }
}
