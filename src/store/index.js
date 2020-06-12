/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Battleship from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Battleship, composeEnhancers(applyMiddleware(thunk)));

export default store;
