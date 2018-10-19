import {observable} from 'mobx';

export interface ICommonState {
    error: string;
    setError: (error: string) => void;
    clearError: () => void;
}

export class CommonStore implements ICommonState {
    @observable error: string = '';

    setError(error: string) {
        this.error = error;
    }

    clearError() {
        this.error = '';
    }
}
