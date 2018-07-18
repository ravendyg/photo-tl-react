import * as React from 'react';
import { IStore } from '../../typings/interfaces';

const store: IStore = require('./../store.ts').Store;

export class ListeningComponent<P, S> extends React.Component<P, S> {
    private _unsubscribe: () => void;

    protected oldState: S;

    componentDidMount () {
        this._unsubscribe = store.subscribe(() => {
            let mutated = false;
            const state: any = store.getState();
            for (var key in this.oldState) {
                // check given property exists on the global state, if then check whether it changed
                if (state[key] && this.oldState[key] !== state[key]) {
                    this.oldState[key] = state[key];
                    mutated = true;
                    break;
                }
            }
            if (mutated) {
                this.transformState()
            }
        });
    }

    componentWillUnmount () {
        this._unsubscribe();
    }

    // if child component needs data to be filtered, it should overload transformState
    protected transformState () {
        this.setState(this.oldState);
    }
}
