import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import {combineReducers} from "redux";
import {Provider} from "react-redux";
import {MainReducer} from "./data/mainReducer";

const reducer = combineReducers({
    localData:MainReducer
})
const store= createStore(reducer);
ReactDOM.render(<Provider store={store} >
                    <App />
                </Provider> , document.getElementById('root'));

serviceWorker.unregister();
