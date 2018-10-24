import {ICommonStore} from '../store/commonStore';

export interface ICommonActions {
    hideModal: () => void;
    displayAddPhotoModal: () => void;
}

export class CommonActions implements ICommonActions {
    constructor(
        private commonStore: ICommonStore,
    ) {}

    hideModal = () => {
        this.commonStore.setModal(null);
    }

    displayAddPhotoModal = () => {
        this.commonStore.setModal('add');
    }
}
