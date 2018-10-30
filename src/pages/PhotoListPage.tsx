import * as React from 'react';
import { pageStyle } from '../styles';
import { observer } from 'mobx-react';
import { PhotoCard } from '../components/PhotoCard';
import { IDeps } from '../types';

const photoListPageStyle = {
    ...pageStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '800px',
    minWidth: '400px',
    width: '100%',
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
        const { deps } = this.props;
        const {
            photoStore,
            commonStore: {
                commentsDisplayedFor,
            },
        } = deps;

        return (
            <div style={photoListPageStyle}>
                {photoStore.photos.map(photo => {
                    const showComments = photo.iid === commentsDisplayedFor;
                    return <PhotoCard
                        key={photo.iid}
                        deps={deps}
                        photo={photo}
                        showComments={showComments}
                    />;
                })}
            </div>
        );
    }
}
