import * as React from 'react';
import {Input, EInputType} from './Input';

const labelStyle = {
    height: '2rem',
};

const inputWrapperStyle = {
    marginBottom: '2rem',
};

interface IFormItemProps {
    expand?: boolean;
    label?: string;
    type: EInputType,
    value: string,
    onChange: (value: string) => void;
}

interface IFormItemState {

}

export class FormItem extends React.PureComponent<IFormItemProps, IFormItemState> {
    render() {
        const {
            expand,
            label,
            type,
            value,
            onChange,
        } = this.props;

        const input =
            <div style={inputWrapperStyle}>
                <Input
                    expand={expand}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>;

        return Boolean(label)
            ? (
                <label>
                    <div style={labelStyle}>
                        {label}
                    </div>
                    {input}
                </label>
            )
            : {input};

    }
}
