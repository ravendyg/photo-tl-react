import * as React from 'react';

const overlayStyle = {
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
};

const containerStyle = {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const contentStyle = {
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'white',
    margin: '2rem auto',
    overflowY: 'auto',
}

interface IModalWrapperProps {
    onOverlayClick?: () => void;
}

export class ModalWrapper extends React.Component<IModalWrapperProps, {}> {
    render() {
        const {
            children,
            onOverlayClick,
        } = this.props;
        return (
            <div
                className='modal-container'
                style={containerStyle}
            >
                <div
                    className="modal-overlay"
                    onClick={onOverlayClick}
                    style={overlayStyle}
                />
                <div
                    className="modal-content"
                    style={contentStyle}
                >
                    {children}
                </div>
            </div>
        );
    }
}
