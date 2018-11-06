import * as React from 'react';

const headerStyle = {
    padding: '0 1.5rem',
};;

interface IModalHeaderProps {
    text: string;
}

export class ModalHeader extends React.PureComponent<IModalHeaderProps, {}> {
    render() {
        const {text} = this.props;
        return (
            <div className="modal-header" style={headerStyle}>
                <h4>
                    {text}
                </h4>
            </div>
        );
    }
}
