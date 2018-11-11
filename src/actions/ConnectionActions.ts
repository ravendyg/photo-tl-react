import { IConnectionStore } from '../store/connectionStore';
import { IUser } from '../types';
import { IWebSocketService } from '../services/WebSocketService';

function defaultMapper(message: string | ArrayBuffer): IWSContainer | null {
    if (typeof message === 'string') {
        try {
            return JSON.parse(message);
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    console.error('ArrayBuffer deserialisation is not implemented');
    return null;
}

export enum EWSAction {
    NEW_PHOTO = 1,
    RATING_UPDATE = 2,
    PATCH_PHOTO = 3,
    DELETE_PHOTO = 4,
    NEW_COMMENT = 5,
    DELET_COMMENT = 6,
    ADD_VIEW = 7,
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
    private mapper: (message: string | ArrayBuffer) => IWSContainer | null;

    constructor (
        private connectionStore: IConnectionStore,
        private webSocketService: IWebSocketService,
    ) {
        this.mapper = defaultMapper;
    }

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

    private handleMessage = (message: string | ArrayBuffer) => {
        const data = this.mapper(message);
        if (data === null) {
            return;
        }
        const {
            action,
            payload,
        } = data;
        const listeners = this.listeners[action];
        if (listeners) {
            listeners.forEach(listener => listener(payload));
        }
    }

    private handleDisconnect = (status: string, message: string) => {
        this.connectionStore.setStatus(status, message);
    }
}
