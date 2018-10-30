import * as React from 'react';

export enum EBtnType {
    DEFAUL,
    WARNING,
    SECONDARY,
}

export enum EBtnSize {
    BIG,
    MEDIUM,
    SMALL,
}

function createStyle(type: EBtnType, size: EBtnSize) {
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
    let width = '10rem';
    let height = '2rem';
    switch (size) {
        case EBtnSize.MEDIUM: {
            width = '6rem';
            height = '2rem';
            break;
        }
        case EBtnSize.SMALL: {
            width = '4rem';
            height = '1.5rem';
            break;
        }
    }

    return {
        width,
        height,
        backgroundColor,
    };
}

interface IBtnProps {
    disabled?: boolean;
    type?: EBtnType;
    size?: EBtnSize;
    label: string;
    action: () => void;
}

export class Btn extends React.PureComponent<IBtnProps, {}> {
    render() {
        const {
            action,
            disabled,
            label,
            size = EBtnSize.BIG,
            type = EBtnType.DEFAUL,
        } = this.props;
        const style = createStyle(type, size);

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
