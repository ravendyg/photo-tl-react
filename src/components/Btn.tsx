import * as React from 'react';

export enum EBtnType {
    DEFAUL,
    WARNING,
    SECONDARY,
}

function createStyle(type: EBtnType) {
    let backgroundColor = 'lightblue';
    switch (type) {
        case EBtnType.WARNING: {
            backgroundColor = 'orange';
            break;
        }
        case EBtnType.SECONDARY: {
            backgroundColor = 'transaparent';
            break;
        }
    }
    return {
        width: '10rem',
        height: '2rem',
        backgroundColor,
    };
}

interface IBtnProps {
    disabled?: boolean;
    type?: EBtnType;
    label: string;
    action: () => void;
}

export class Btn extends React.PureComponent<IBtnProps, {}> {
    render() {
        const {
            action,
            disabled,
            label,
            type
        } = this.props;
        const style = createStyle(type);

        return (
            <button
                disabled={disabled}
                onClick={action}
                style={style}
            >
                {label}
            </button>
        );
    }
}
