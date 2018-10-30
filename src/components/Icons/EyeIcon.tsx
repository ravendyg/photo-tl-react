import * as React from 'react';

interface IEditIconProps {
    size: number,
}

const content = 'M16,9 C7,9 3,16 3,16 C3,16 7,23.000001 16,23 C25,22.999999 '
    + '29,16 29,16 C29,16 25,9 16,9 L16,9 L16,9 Z M16,10 C8,10 '
    + '4.19995117,16 4.19995117,16 C4.19995117,16 8,22.0000006 16,22 '
    + 'C24,21.999999 27.8000488,16 27.8000488,16 C27.8000488,16 24,10 '
    + '16,10 L16,10 L16,10 Z M16,20 C18.2091391,20 20,18.2091391 20,16 '
    + 'C20,13.7908609 18.2091391,12 16,12 C13.7908609,12 12,13.7908609 '
    + '12,16 C12,18.2091391 13.7908609,20 16,20 L16,20 L16,20 Z M16,19 '
    + 'C17.6568543,19 19,17.6568543 19,16 C19,14.3431457 17.6568543,13 '
    + '16,13 C14.3431457,13 13,14.3431457 13,16 C13,17.6568543 '
    + '14.3431457,19 16,19 L16,19 L16,19 Z M16,17 C16.5522848,17 17,'
    + '16.5522848 17,16 C17,15.4477152 16.5522848,15 16,15 C15.4477152,'
    + '15 15,15.4477152 15,16 C15,16.5522848 15.4477152,17 16,17 L16,17 '
    + 'L16,17 Z'

export class EyeIcon extends React.PureComponent<IEditIconProps, {}> {
    render() {
        const { size } = this.props;

        return (
            <svg
                height={`${size}rem`}
                viewBox={`0 0 34 34`}
                width={`${size}rem`}
                version='1.1'
                fillRule='evenodd'
            >
                <g>
                    <path d={content} />
                </g>
            </svg>
        );
    }
}
