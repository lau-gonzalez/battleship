import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import WelcomeScreen from './containers/WelcomeScreenConnected';
import Options from './containers/OptionsConnected';
import FinalScreen from './containers/FinalScreenConnected'



export default function App () {
    return (
    <Provider store={store}>      
      <Router >
            <Switch>
              <Route path="/final" component={FinalScreen} /> 
              <Route path="/options" component={Options} />    
              <Route path="/" component={WelcomeScreen} />                    
           </Switch>       
      </Router>
    </Provider>  
)}
  