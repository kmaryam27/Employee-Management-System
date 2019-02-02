import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/sign-up/Sign-up';
import API from '../utils/API';

class SignUpPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: '',
      name: '',
      password: '',
      access: 2
    }
  }

  /**
   * @description Process the form.
   * @description  create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    event.preventDefault();
    const { name, email, password, access} = this.state.user;
    const avatar = this.props.imgAdd;
    API.signUpm(this.props.token,{name, email, password, access, avatar}).then(res => {

        localStorage.setItem('successMessage', res.data.message);
        alert('Employee added successfully');

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
   *
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
   *@description  Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        submitFile={this.props.submitFile} 
        handleFileUpload={this.props.handleFileUpload} 
        file={this.props.file}
        imgAdd={this.props.imgAdd}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
