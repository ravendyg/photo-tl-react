import * as React from 'react';
import {FormItem} from '../components/FormItem';
import {Btn, EBtnType} from '../components/Btn';
import {EInputType} from '../components/Input';
import {pageStyle} from '../styles';
import {IAppStore} from '../store/store';
import {observer} from 'mobx-react';

const photoListPageStyle = {
    ...pageStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

interface IPhotoListPageProps {
    store: IAppStore;
}

interface IPhotoListPageState {

}

@observer
export class PholoListPage extends React.Component<IPhotoListPageProps, IPhotoListPageState> {
    render() {
        return (
            <div style={photoListPageStyle}>
                Photo List
            </div>
        );
    }
}
