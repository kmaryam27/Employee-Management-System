import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';


class LogoutFunction extends React.Component {
/**
 * @description change the current URL to / after logout
 */
  componentDidMount() {
    Auth.deauthenticateUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    )
  }
}

LogoutFunction.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LogoutFunction;
