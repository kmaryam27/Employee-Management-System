import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router,Route,Link, Switch} from 'react-router-dom'
import { PrivateRoute, PropsRoute, LoggedOutRoute} from './components/routes/Routes';
import Auth from './utils/Auth';
import Social from './components/social/Social';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
// import LogoutFunction from './pages/LogoutFunction.jsx';
// import SignUpPage from './pages/SignUpPage.jsx';
// import DashboardPage from './pages/DashboardPage.jsx';
// import PostModal from './pages/SimpleModalWrapped';
// import { Modal } from '@material-ui/core';

class App extends Component {

  state = {
    authenticated: false
  }

  /**
   * @description in load page check if user is logged in on refresh
   */
  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  /**
   * @description check authenticated status and toggle state based on that
   */
  toggleAuthenticateStatus = () => {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <div className="top-bar">
              <div className="top-bar-left">
                <Social />
              </div>
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard" className="log-register">Dashboard</Link>
                  <Link to="/logout" className="log-register">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                <Link className="log-register" to="/login">Log in</Link>
                {/* <Link to="/signup" className="log-register">Sign up</Link> */}
                </div>
              )}
            </div>
            <Switch>
              <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={this.toggleAuthenticateStatus}/>
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus}/>
            {/* <PrivateRoute exact path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/> */}
              {/* <Route path="/:post_id" component={PostModal}/> */}
            </Switch>
          </div>

        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
