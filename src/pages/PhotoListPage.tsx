import * as React from 'react';
import {pageStyle} from '../styles';
import {IAppStore} from '../store/store';
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
    store: IAppStore;
    deps: IDeps;
}

interface IPhotoListPageState {

}

@observer
export class PholoListPage extends React.Component<IPhotoListPageProps, IPhotoListPageState> {
    componentWillMount() {
        const {store: {photoStore}} = this.props;
        photoStore.loadPhotos();
    }

    render() {
        const { store: { photoStore } } = this.props;

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
