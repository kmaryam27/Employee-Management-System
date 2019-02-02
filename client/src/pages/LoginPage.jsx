import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';
import LoginForm from '../components/login/Login-form.jsx';
import API from '../utils/API';

class LoginPage extends React.Component {
  _isMounted = false;
  // set the initial component state
  state = {
    errors: {},
    successMessage: '',
    user: {
      email: '',
      password: ''
    }
  }
  
  componentDidMount(){
    this._isMounted = true;
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.setState({ successMessage });
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.setState({
          errors: {}
        });
  }
  /**
   * @description Process the form.
   *@description 45: create a string for an HTTP body message
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    event.preventDefault();

    const { email, password } = this.state.user;

    API.login({email, password}).then(res => {
      if(this._isMounted){
        Auth.authenticateUser(res.data.token);
        this.props.toggleAuthenticateStatus();
        this.props.history.push('/dashboard');
        
      }
        
    }).catch(( {response} ) => {

        const errors = response.data.errors ? response.data.errors : {};
        errors.summary = response.data.message;

        this.setState({
          errors
        });
      });
    
  }

  /**
   * @description Change the user object.
   * @param {object} event - the JavaScript event object
   */
  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * @description Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
