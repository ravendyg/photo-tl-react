/// <reference path="../typings/tsd.d.ts" />

import polyfils from './utils/polyfils.ts';



const Redux: IRedux = vendor.Redux;
const React: IReact = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counter = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

console.log(polyfils);

// const store = Redux.createStore(counter);
const createStore = (reducer) => {
    let state;
    let listeners = [];
    
    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach( listener => listener());
    };
    
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };
    
    dispatch({});
    
    return { getState, dispatch, subscribe }; 
}

const store = createStore(counter);

const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
   ReactDom.render(
       <Counter
            value={store.getState()}
            onIncrement = {() => store.dispatch({
                type: INCREMENT
            })}
            onDecrement = {() => store.dispatch({
                type: DECREMENT
            })}
        />,
       document.getElementById('root')
   );
};

store.subscribe(render);
render();

