/// <reference path="../typings/tsd.d.ts" />

import polyfils from './utils/polyfils.ts';

const Redux: IRedux = vendor.Redux;
const React = vendor.React;
const ReactDom: IReactDom = vendor.ReactDom;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT2 = 'INCREMENT2';
const DECREMENT2 = 'DECREMENT2';

const counter = (state = [0,0], action) => {
    switch (action.type) {
        case INCREMENT:      
            return [
                ...state.slice(0, action.payload.index),
                state[action.payload.index] + 1,
                ...state.slice(action.payload.index+1)
            ]
        case DECREMENT:
            return [
                ...state.slice(0, action.payload.index),
                state[action.payload.index] - 1,
                ...state.slice(action.payload.index+1)
            ]
        default:
            return state;
    }
}

const counter2 = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT2:
            return state + 1;
        case DECREMENT2:
            return state - 1;
        default:
            return state;
    }
}

const store = Redux.createStore(counter);
// const createStore = (reducer) => {
//     let state;
//     let listeners = [];
    
//     const getState = () => state;
    
//     const dispatch = (action) => {
//         state = reducer(state, action);
//         listeners.forEach( listener => listener());
//     };
    
//     const subscribe = (listener) => {
//         listeners.push(listener);
//         return () => {
//             listeners = listeners.filter(l => l !== listener);
//         }
//     };
    
//     dispatch({});
    
//     return { getState, dispatch, subscribe }; 
// }

// const store = createStore(counter);

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
       <div>
        <Counter
                value={store.getState()[0]}
                onIncrement = {() => store.dispatch({
                    type: INCREMENT,
                    payload: {
                        index: 0
                    }
                })}
                onDecrement = {() => store.dispatch({
                    type: DECREMENT,
                    payload: {
                        index: 0
                    }
                })}
            />
            <Counter
                value={store.getState()[1]}
                onIncrement = {() => store.dispatch({
                    type: INCREMENT,
                    payload: {
                        index: 1
                    }
                })}
                onDecrement = {() => store.dispatch({
                    type: DECREMENT,
                    payload: {
                        index: 1
                    }
                })}
            />
        </div>,        
       document.getElementById('root')
   );
};

store.subscribe(render);
render();


var a = [1,2,3,4];
console.log([
    ...a.slice(0,2),
    ...a.slice(3)
]);

var b = {
    _a: 10,
    _b: 12
}
var xx = polyfils.objectAssign({}, [b, {_b: 0}]);
console.log(xx);

// var obj = { x: 1, y: 2};
// var obj1 = {...obj, z: 3};