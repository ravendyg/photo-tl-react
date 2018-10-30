import * as React from 'react';

interface IEditIconProps {
    size: number,
}

export class EditIcon extends React.PureComponent<IEditIconProps, {}> {
    render() {
        const { size } = this.props;

        return (
            <svg
                viewBox='0 0 34 34'
                width={`${size}rem`}
                height={`${size}rem`}
            >
                <polygon points='15.888,24.656 6.976,28 10.316,19.085 ' />
                <rect
                    x='16.618'
                    y='5.739'
                    transform='matrix(-0.707 -0.7072 0.7072 -0.707 24.7792 39.4361)'
                    width='7.88'
                    height='17.694'
                />
                <rect
                    x='25.383'
                    y='3.852'
                    transform='matrix(-0.7072 -0.707 0.707 -0.7072 45.9406 30.6714)'
                    width='7.878'
                    height='3.94'
                />
                <rect width='16' height='2' />
                <rect width='2' height='34' />
                <rect x='32' y='17' width='2' height='17' />
                <rect y='32' width='33' height='2' />
            </svg>
        );
    }
}
