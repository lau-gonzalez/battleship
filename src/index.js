import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Battleship from './reducers';
import BattleshipGame from './components/BattleshipGame';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(Battleship, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
    <Provider store={store}>
      <div>
        <BattleshipGame />
      </div>
    </Provider>  
  );
  
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
