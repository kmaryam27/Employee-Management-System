import React from 'react';
import PropTypes from 'prop-types';
import PortfolioForm from '../components/portfolio/Portfolio';
import API from '../utils/API';

class portfolioPage extends React.Component {
  state = {
    errors: {},
    user: {
      email: '',
      name: '',
      password: '',
      access: 2
    },
    userFirst:{}
  }

  componentDidMount(){
      
    console.log(this.props.user)
    this.setState({userFirst: this.props.user, user: this.state.user})
  }

  /**
   * Process the form.
   * create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    event.preventDefault();
    const _id = this.state.userFirst._id;
    const { name, email/*, password*/, access} = this.state.user;
    const password = '12345678';
    const avatar = this.props.imgAdd;
    API.updatePortfolio(this.props.token,{_id,name, email, access, password}).then(res => {
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
   * Change the user object.
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
   * Render the component.
   */
  render() {
    return (
        <div>
            {console.log('render portfolio')}
            {console.log(this.props.user)}
            <PortfolioForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.props.user}
        submitFile={this.props.submitFile} 
        handleFileUpload={this.props.handleFileUpload} 
        file={this.props.file}
        imgAdd={this.props.imgAdd}
      />
        </div>
    
    );
  }

}

portfolioPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default portfolioPage;
