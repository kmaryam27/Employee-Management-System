import React from 'react';
import PropTypes from 'prop-types';
import PortfolioForm from '../components/portfolio/Portfolio';
import API from '../utils/API';

class portfolioPage extends React.Component {
  _isMounted = false;
  state = {
    errors: {},
    userPortfolio: {
      email: '',
      name: '',
      avatar: '',
      access: 2
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted === true) {
      const userPortfolio = this.state.userPortfolio;
      userPortfolio['access'] = this.props.user.access;
      this.setState({
        userPortfolio
      });
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }





  /**
   * Process the form.
   * create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    event.preventDefault();
      let userId = this.props.user._id;
      const selected = this.state.userPortfolio;
      if(this.state.uploadedImg !== '') selected.avatar = this.props.uploadedImg;
       API.updateUser(this.props.token, {userId, selected}).then(res => {
        alert('Portfolio changed successfully please refresh the page');
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
    const userPortfolio = this.state.userPortfolio;
    userPortfolio[field] = event.target.value;
    this.setState({
      userPortfolio
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
        <div>
            <PortfolioForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.props.user}
        userPortfolio={this.state.userPortfolio}
        handleFileUpload={this.props.handleFileUpload} 
        file={this.props.file}
        imgAdd={this.props.imgAdd}
        uploadedImg={this.props.uploadedImg}
      />
        </div>
    
    );
  }

}

portfolioPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default portfolioPage;
