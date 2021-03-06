import { observable } from 'mobx';

declare type TModal = 'edit-photo' | 'comments' | null;

export interface ICommonStore {
    modal: TModal;
    error: string;

    setError: (error: string) => void;
    clearError: () => void;
    setModal: (modal?: TModal) => void;
}

// TODO: rename - e.g. UiStore
export class CommonStore implements ICommonStore {
    @observable modal: TModal = null;
    @observable error: string = '';

    setError(error: string = 'Smth went wrong') {
        this.error = error;
    }

    clearError() {
        this.error = '';
    }

    setModal(modal: TModal = null) {
        this.modal = modal;
    }
}
