import React, { Component } from 'react';
import './App.css';
import Landing from './pages/Landing';
import InputForm from './pages/Register';
import ProSearch from './pages/ProSearch';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route component={Landing} exact path='/'></Route>
                    <Route component={InputForm} exact path='/Register'></Route>
                    <Route component={ProSearch}></Route>
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
