import { IConnectionStore } from '../store/connectionStore';
import { IUser } from '../types';
import { IWebSocketService } from '../services/WebSocketService';

export enum EWSAction {
    NEW_PHOTO = 1,
}

interface IWSContainer {
    action: EWSAction,
    payload: any,
}

export interface IConnectionActions {
    connect: (user: IUser) => void;
    disconnect: () => void;
    subscribe: (action: EWSAction, cb: (payload: any) => void) => () => void;
}

// service like actions, not sure what it should be
export class ConnectionActions implements IConnectionActions {
    private listeners: {
        [action: number]: ((data: any) => void)[],
    } = {};

    constructor (
        private connectionStore: IConnectionStore,
        private webSocketService: IWebSocketService,
    ) { }

    connect(user: IUser) {
        if (this.connectionStore.status === 'disconnected') {
            this.connectionStore.setStatus('connecting', 'Connecting...');
            this.webSocketService.connect(
                this.handleConnect,
                this.handleMessage,
                this.handleDisconnect,
            );
        }
    }

    disconnect() {
        this.webSocketService.disconnect();
    }

    subscribe(action: EWSAction, cb: (message: any) => void) {
        if (!this.listeners[action]) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(cb);
        return () => {
            this.listeners[action] = this.listeners[action].filter(listener => listener !== cb);
        }
    }

    private handleConnect = () => {
        this.connectionStore.setStatus('connected', 'Connected');
    }

    private handleMessage = (message: IWSContainer) => {
        const {
            action,
            payload,
        } = message;
        // TODO: implement ArrayBuffer deserialisation
        const listeners = this.listeners[action];
        if (listeners) {
            listeners.forEach(listener => listener(payload));
        }
    }

    private handleDisconnect = (status: string, message: string) => {
        this.connectionStore.setStatus(status, message);
    }
}
