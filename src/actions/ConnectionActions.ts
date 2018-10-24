import {IConnectionStore} from '../store/connectionStore';
import {IUser} from '../types';
import {IWebSocketService} from 'src/services/WebSocketService';

export interface IConnectionActions {
    connect: (user: IUser) => void;
    disconnect: () => void;
}

// service like actions, not sure what it should be
export class ConnectionActions implements IConnectionActions {
    constructor(
        private connectionStore: IConnectionStore,
        private webSocketService: IWebSocketService,
    ) {}

    private handleConnect = () => {
        this.connectionStore.setStatus('connected', 'Connected');
    }

    private handleDisconnect = (message: string) => {
        this.connectionStore.setStatus('disconnected', message);
    }

    connect(user: IUser) {
        if (this.connectionStore.status === 'disconnected') {
            this.connectionStore.setStatus('connecting', 'Connecting...');
            this.webSocketService.connect(this.handleConnect, this.handleDisconnect);
        }
    }

    disconnect() {
        this.webSocketService.disconnect();
    }
}
