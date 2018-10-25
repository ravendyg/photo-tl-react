import * as React from 'react';

interface IModalHeaderProps {
    text: string;
}

export class ModalHeader extends React.PureComponent<IModalHeaderProps, {}> {
    render() {
        const {text} = this.props;
        return (
            <div className="modal-header">{text}</div>
        );
    }
}
