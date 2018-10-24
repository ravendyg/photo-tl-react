import {observable} from 'mobx';

export interface ICommonStore {
    error: string;
    setError: (error: string) => void;
    clearError: () => void;
}

export class CommonStore implements ICommonStore {
    @observable error: string = '';

    setError(error: string = 'Smth went wrong') {
        this.error = error;
    }

    clearError() {
        this.error = '';
    }
}
