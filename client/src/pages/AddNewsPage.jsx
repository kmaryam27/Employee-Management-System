import React from 'react';
import PostForm from '../components/posts/Post-page';
import API from '../utils/API';

class AddNewsPage extends React.Component {

  state = {
    errors: {},
    user: {},
    post: {
      title: '',
      subtitle: '',
      context: '',
      imageAddress: ''
    }
  }

  componentDidMount(){
    this.setState({user: this.props.user})
  }

  /**
   * @description Process the form.
   * @description create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  handleAddNews = event => {
    event.preventDefault();
    const { title, subtitle, imageAddress, context} = this.state.post;
    const avatar = this.props.uploadedImg;
    const userId = this.state.user._id;
    API.addPosts(this.props.token,{userId, title, subtitle, avatar, context}).then(res => {

      API.addAct(this.props.token, {userId, act:"added new post"}).then(res => {
          this.props.sendMessage(this.state.user.name +' added new post');
          alert('new post added successfully');
        });
      
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
    const post = this.state.post;
    post[field] = event.target.value;

    this.setState({
      post
    });
  }

  /**
   *@description Render the component.
   */
  render() {
    return (
      <PostForm
        onSubmit={this.handleAddNews}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        post={this.state.post}
        submitFile={this.props.submitFile} 
        handleFileUpload={this.props.handleFileUpload} 
        file={this.props.file}
        imgAdd={this.props.imgAdd}
        uploadedImg={this.props.uploadedImg}
      />
    );
  }

}

export default AddNewsPage;
