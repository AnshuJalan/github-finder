import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import User from './components/users/User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

class App extends Component {
  render() {
    return (
      <GithubState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <AlertState>
                <Alert />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/user/:login' component={User} />
                  <Route component={NotFound} />
                </Switch>
              </AlertState>
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }
}

export default App;
