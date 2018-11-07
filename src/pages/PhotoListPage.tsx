import * as React from 'react';
import { pageStyle } from '../styles';
import { observer } from 'mobx-react';
import { PhotoCard } from '../components/PhotoCard';
import { IDeps, IPhoto } from '../types';

const observerOptions = {
    root: document.body,
    rootMargin: '0px',
    threshold: 0.9,
};

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
    private observer: IntersectionObserver | null;
    private observedImages: {[iid: string]: boolean} = {};

    constructor(props: IPhotoListPageProps) {
        super(props);
        this.observer = IntersectionObserver
            && new IntersectionObserver(this.registerView, observerOptions)
            || null;
    }

    componentWillMount() {
        this.props.deps.photoActions.loadPhotos();
    }

    registerView = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target as HTMLImageElement | undefined;
                if (target && target.dataset) {
                    const { iid } = target.dataset;
                    if (iid && !this.observedImages[iid]) {
                        this.observedImages[iid] = true;
                        this.props.deps.photoActions.registerView(iid);
                    }
                }
            }
        });
    }

    editPhoto = (photo: IPhoto) => this.props.deps.photoActions.editPhoto;

    render() {
        const { deps } = this.props;
        const {
            photoStore,
        } = deps;

        return (
            <div style={photoListPageStyle}>
                {photoStore.photos.map(photo => {
                    return <PhotoCard
                        key={photo.iid}
                        deps={deps}
                        edit={this.editPhoto}
                        photo={photo}
                        observer={this.observer}
                    />;
                })}
            </div>
        );
    }
}
