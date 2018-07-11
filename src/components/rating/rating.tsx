const React: IReact = vendor.React;

// const Utils: IUtils = require('./../../utils/utils.ts').Utils;

export class Rating extends React.Component {

    public props: {
        photo: ImageType,
        title: string,
        user?: TUser,
        onClick?: (voteValue: number, iid: string) => void
    }

    shouldComponentUpdate() {
        // TODO: Implement pure.
        return true;
    }

    /**
     * given a rating produces an array of strings with icons
     */
    private _calculateStarClassName(rt: number): string [] {
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

    private _onClick(i: number) {
        const {
            onClick,
            photo
        } = this.props;
        if (typeof onClick === 'function') {
            onClick(i, photo.iid);
        }
    }

    render() {
        // cursor over 'my rating'
        let iStyle = {cursor: ``, marginTop: ``, marginBottom: ``};
        const {
            photo,
            user,
            title
        } = this.props;
        if (user) {
            iStyle.cursor = `pointer`;
        }
        if (window.outerWidth <= 500) {
            iStyle.marginTop = `10px`;
            iStyle.marginBottom = `10px`;
        }
        let ratings = user
                ? photo.ratings.filter(e => e.user === user.uid)
                : photo.ratings;
        let averageRating = (ratings.length > 0) ? (ratings.reduce((p, c) => p + c.value, 0) / ratings.length) : 0;
        averageRating = Math.round(averageRating * 10) / 10;
        const ratingStarClassNames = this._calculateStarClassName(averageRating);

        return (
        <span style={{marginRight: `20px`}}>
            <span>{`${title} `}</span>
            {ratingStarClassNames.map((e,i) => (
                <i
                    className={`fa fa-star${e}`}
                    key={i}
                    onClick={ () => {this._onClick(i+1)} }
                    style={iStyle}
                />
            ))}
            <span>{` ${averageRating}`}</span>
        </span>
        )
    }
}

