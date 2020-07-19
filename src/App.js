import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import About from './components/pages/About';
import User from './components/users/User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    user: {},
    users: [],
    repos: [],
    alert: null,
  };

  //Github User Search
  searchUsers = async (text) => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: res.data.items });
  };

  //Show Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  //Get specific user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    );
    this.setState({ loading: false, user: res.data });
  };

  //Get Repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = (e) => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { users, user, loading, alert, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    getUserRepos={this.getUserRepos}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
