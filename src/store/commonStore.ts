import {observable} from 'mobx';

declare type TModal = 'edit-photo' | null;

export interface ICommonStore {
    modal: TModal;
    error: string;

    setError: (error: string) => void;
    clearError: () => void;
    setModal: (modal: TModal) => void;
}

export class CommonStore implements ICommonStore {
    @observable modal: TModal = null;
    @observable error: string = '';

    setError(error: string = 'Smth went wrong') {
        this.error = error;
    }

    clearError() {
        this.error = '';
    }

    setModal(modal: TModal) {
        this.modal = modal;
    }
}
