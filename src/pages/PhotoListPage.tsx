import * as React from 'react';
import {pageStyle} from '../styles';
import {observer} from 'mobx-react';
import {PhotoCard} from '../components/PhotoCard';
import {IDeps} from '../types';

const photoListPageStyle = {
    ...pageStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

interface IPhotoListPageProps {
    deps: IDeps;
}

interface IPhotoListPageState {

}

@observer
export class PholoListPage extends React.Component<IPhotoListPageProps, IPhotoListPageState> {
    componentWillMount() {
        const {
            deps: {
                photoActions,
            },
        } = this.props;
        photoActions.loadPhotos();
    }

    render() {
        const {
            deps: {
                photoStore,
            },
        } = this.props;

        return (
            <div style={photoListPageStyle}>
                {photoStore.photos.map(photo => (
                    <PhotoCard
                        key={photo.iid}
                        photo={photo}
                    />
                ))};
            </div>
        );
    }
}
