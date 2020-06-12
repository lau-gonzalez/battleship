/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import WelcomeScreen from './containers/WelcomeScreenConnected';
import BattleshipGameContainer from './components/BattleshipGameContainer';
import FinalScreen from './containers/FinalScreenConnected';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/final" component={FinalScreen} />
          <Route path="/battleship" component={BattleshipGameContainer} />
          <Route path="/" component={WelcomeScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}
