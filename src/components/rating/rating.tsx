/// <reference path="../../../typings/tsd.d.ts" />

// vendor
const React: IReact = vendor.React;

const Utils: IUtils = require('./../../utils/utils.ts');

export class Rating extends React.Component {

    public props: {
        rating: RatingType [],
        title: string,
        user?: string,
        onClick?: (vote: number) => void
    }

    constructor(){
        super();
    }
    
    // given a rating produces an array of strings with icons 
    private _calculate (rt: number): string [] {
        let tmp: string [] = [];
        for (let i=1; i <= 5; i++) {
            if (i <= rt) {
                tmp.push(``);
            } else if (i-1 < rt) {
                tmp.push(`-half-o`);
            } else {
                tmp.push(`-o`);
            }
        }
        return tmp;
    }
    
    private _onClick (i: number) {
        if (this.props.onClick !== undefined) {
            this.props.onClick(i);
        }
    }
        
    render() { 
        // cursor over 'my rating'
        let iStyle = {cursor: ``, marginTop: ``, marginBottom: ``};
        if (this.props.user !== undefined) {
            iStyle.cursor = `pointer`;
        }
        if (window.outerWidth <= 500) {
            iStyle.marginTop = `10px`;
            iStyle.marginBottom = `10px`;
        }
        // rating
        let rating = (this.props.user !== undefined)
                ? this.props.rating.filter(e=>e.user===this.props.user)
                : this.props.rating;
        let rt = (rating.length > 0) ? (rating.reduce( (p,c) => p+c.val, 0) / rating.length) : 0;
        rt = Math.round(rt * 10) / 10;
        let rtArr = this._calculate(rt);
        
        return (
        <span style={{marginRight: `20px`}}>        
            <span>{`${this.props.title} `}</span>
            {rtArr.map( (e,i) => 
                <i  className={`fa fa-star${e}`}
                    key={i}
                    onClick={ () => {this._onClick(i+1)} }
                    style={iStyle}>
                </i>
            )}
            <span>{` ${rt}`}</span>
        </span>
        )
    }
}

