import * as React from 'react';
import {Btn, EBtnType} from '../Btn';

const modalFooterStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
}

export interface IFooterActionType {
    action: () => void;
    disabled: boolean;
    label: string;
    type: EBtnType;
}

interface IModalFooterProps {
    actions?: IFooterActionType[];
}

export class ModalFooter extends React.PureComponent<IModalFooterProps, {}> {
    render() {
        const {actions = []} = this.props;

        return (
            <div className="modal-footer" style={modalFooterStyle}>
                {actions.map(action => (
                    <div
                        key={action.label}
                        style={{margin: '0.5rem'}}
                    >
                        <Btn
                            action={action.action}
                            disabled={action.disabled}
                            label={action.label}
                            type={action.type}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
