import { IConnectionStore } from '../store/connectionStore';
import { IUser } from '../types';
import { IWebSocketService } from '../services/WebSocketService';

function defaultUnmarshaller(message: string | ArrayBuffer): IWSContainer | null {
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

function defaultMarshaller(message: IWSContainer) {
    return JSON.stringify(message);
}

export enum EWSAction {
    NEW_PHOTO = 0,
    RATING_UPDATE = 1,
    PATCH_PHOTO = 2,
    DELETE_PHOTO = 3,
    NEW_COMMENT = 4,
    DELETE_COMMENT = 5,
    ADD_VIEW = 6,
}

interface IWSContainer {
    action: EWSAction,
    payload: any,
}

export interface IConnectionActions {
    connect: (token?: string) => void;
    disconnect: () => void;
    subscribe: (action: EWSAction, cb: (payload: any) => void) => () => void;
    send: (action: EWSAction, payload: any) => void;
}

// service like actions, not sure what it should be
export class ConnectionActions implements IConnectionActions {
    private listeners: {
        [action: number]: ((data: any) => void)[],
    } = {};
    private unpack: (message: string | ArrayBuffer) => IWSContainer | null;
    private pack: (message: IWSContainer) => string | ArrayBuffer;

    constructor (
        private connectionStore: IConnectionStore,
        private webSocketService: IWebSocketService,
    ) {
        this.unpack = defaultUnmarshaller;
        this.pack = defaultMarshaller;
    }

    connect = (token?: string) => {
        if (this.connectionStore.status === 'disconnected') {
            this.connectionStore.setStatus('connecting', 'Connecting...');
            this.webSocketService.connect({
                handleConnect: this.handleConnect,
                handleMessage: this.handleMessage,
                handleError: this.handleDisconnect,
                token: token || '',
            });
        }
    }

    disconnect = () => {
        this.webSocketService.disconnect();
    }

    subscribe = (action: EWSAction, cb: (message: any) => void) => {
        if (!this.listeners[action]) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(cb);
        return () => {
            this.listeners[action] = this.listeners[action].filter(listener => listener !== cb);
        }
    }

    send = (action: EWSAction, payload: any) => {
        const message = {
            action,
            payload,
        };
        const packet = this.pack(message);
        this.webSocketService.sendMessage(packet);
    }

    private handleConnect = () => {
        this.connectionStore.setStatus('connected', 'Connected');
    }

    private handleMessage = (message: string | ArrayBuffer) => {
        const data = this.unpack(message);
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
