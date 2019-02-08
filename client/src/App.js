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
import LogoutFunction from './pages/LogoutFunction.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import io from 'socket.io-client'
import API from './utils/API';
let socket = io(`http://localhost:3001`);

class App extends Component {

  state = {
    authenticated: false,//auth
    socketData: {},//notifications
    notificationList:[],
    notifications: 0
  }



  /**
   * @description in load page check if user is logged in on refresh
   */
  componentWillMount() {
    this.toggleAuthenticateStatus();
    socket.on(`emit-task`, data => {
      if((data === 'message')){
        let mynotifications = [];
        let newNotification = 0;
        API.getAct(Auth.getToken()).then(result => {
          for (let i = 0; i < (result.data.items.act).length; i++) {
            if(result.data.items.act[i].isView === false) newNotification++;
            mynotifications.push(result.data.items.act[i]);  
          }  
          this.setState({notifications: newNotification,
          notificationList: mynotifications, socketData: data})
        }).catch(err => console.log(err))
        
        }
    })
  }

/**
 * @description for notification
 */
  sendMessage = message => {
    socket.emit(`update-task`, "message");
  }

  /**
   * @description check authenticated status and toggle state based on that
   */
  toggleAuthenticateStatus = () => {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  handleClickNotification = () => {console.log('here')
    API.updateAct(Auth.getToken(), {}).then(result => {
      this.setState({notifications: 0})
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            {console.log(this.state.notifications)}
            <div className="top-bar">
              <div className="top-bar-left">
                <Social/>
              </div>
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard" className="log-register">Dashboard</Link>
                  <Link to="/logout" className="log-register">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                <Link className="log-register" to="/login">Log in</Link>
                </div>
              )}
            </div>
            <Switch>
              <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={this.toggleAuthenticateStatus}/>
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus}/>
              <PrivateRoute exact path="/dashboard" handleClickNotification={this.handleClickNotification} notificationList={this.state.notificationList} notifications={this.state.notifications} socket = { socket } sendMessage = { this.sendMessage } socketData={this.state.socketData} component={DashboardPage}/>
              <LoggedOutRoute path="/signup" component={SignUpPage}/>
              <Route path="/logout" component={LogoutFunction}/>
            </Switch>
          </div>

        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
