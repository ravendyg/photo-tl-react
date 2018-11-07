import {observable} from 'mobx';

export interface IConnectionStore {
    status: string;
    statusMessage: string;

    setStatus: (status: string, message: string) => void;
}

export class ConnectionStore implements IConnectionStore {
    @observable status = 'disconnected';
    @observable statusMessage = 'Disconnected';

    setStatus(status: string, message: string) {
        this.status = status;
        this.statusMessage = message;
    }
}
