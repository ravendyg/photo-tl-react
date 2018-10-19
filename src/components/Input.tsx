import * as React from 'react';

const inputStyle = {
    lineHeight: '1.5rem',
}

export enum EInputType {
    TEXT,
    PASSWORD,
}

interface IInputProps {
    type: EInputType,
    value: string,
    onChange: (value: string) => void;
}

export class Input extends React.PureComponent<IInputProps, {}> {
    handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {onChange} = this.props;
        const {nativeEvent: {target}} = event;
        const value = (target as HTMLInputElement).value;
        onChange(value);
    }

    render() {
        const {
            type,
            value,
        } = this.props;

        let inputType;
        switch (type) {
            case EInputType.PASSWORD: {
                inputType = 'password';
                break;
            }

            default: {
                inputType = 'text';
            }
        }

        return (
            <input
                type={inputType}
                value={value}
                onChange={this.handleChange}
                style={inputStyle}
            />
        );
    }
}
