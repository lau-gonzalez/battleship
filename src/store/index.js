import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Battleship from './../reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(Battleship, composeEnhancers(applyMiddleware(thunk)));