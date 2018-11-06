import * as React from 'react';

const emptyD = "M 510,197.472 326.63,181.738 255,12.75 183.371,181.738 0,197.472 v 0 0 L 139.103,318.011 97.41,497.25 255,402.186 v 0 L 412.59,497.225 370.898,317.986 Z M 255,354.348 158.97656,412.233 184.37695,303.067 99.708984,229.67558 211.17188,220.08607 255,117.172 l 43.605,102.918 111.689,9.588 -84.711,73.389 25.398,109.166 z";

const halfD = "M510,197.472l-183.37-15.734L255,12.75l-71.629,168.988L0,197.472l0,0l0,0l139.103,120.539L97.41,497.25L255,402.186l0,0    l157.59,95.039l-41.692-179.239L510,197.472z M255,354.348V117.172l43.605,102.918l111.689,9.588l-84.711,73.389l25.398,109.166    L255,354.348z";

const fullD = "M 510,197.472 326.63,181.738 255,12.75 183.371,181.738 0,197.472 v 0 0 L 139.103,318.011 97.41,497.25 255,402.186 v 0 l 157.59,95.039 -41.692,-179.239 z";

export enum EStarFill {
    EMPTY,
    HALF,
    FULL,
}

interface IStartIconProps {
    clickable?: boolean;
    onClick?: () => void;
    size: number;
    type: EStarFill;
    fill?: string;
}

export class StartIcon extends React.PureComponent<IStartIconProps, {}> {
    render() {
        const {
            clickable,
            fill = '#FFDA44',
            onClick = () => {},
            size,
            type,
        } = this.props;
        let d;
        switch (type) {
            case EStarFill.HALF: {
                d = halfD;
                break;
            }
            case EStarFill.FULL: {
                d = fullD;
                break;
            }
            default: {
                d = emptyD;
            }
        }
        const style = {
            cursor: clickable ? 'pointer' : 'initial',
            width: `${size}rem`,
            height: `${size}rem`,
        };

        return (
            <svg
                viewBox='0 0 510 510'
                x="0px"
                y="0px"
                style={style}
                onClick={onClick}
            >
                <g>
                    <g>
                        <path d={d} fill={fill} />
                    </g>
                </g>
            </svg>
        );
    }
}
