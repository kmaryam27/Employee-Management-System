import React from 'react';
import PostForm from '../components/posts/Post-page';
import API from '../utils/API';

class AddNewsPage extends React.Component {

  // state = {
    // errors: {},
    // user: {},
    // post: {
    //   title: '',
    //   subtitle: '',
    //   context: '',
    //   imageAddress: ''
    // }
  // }

  // componentDidMount(){
  //   this.setState({user: this.props.user})
  // }

  /**
   * @description Process the form.
   * @description create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  // handleAddNews = event => {
  //   event.preventDefault();
  //   const { title, subtitle, imageAddress, context} = this.state.post;
  //   const avatar = this.props.uploadedImg;
  //   const userId = this.state.user._id;
  //   API.addPosts(this.props.token,{userId, title, subtitle, avatar, context}).then(res => {

  //     API.addAct(this.props.token, {userId, act:"added new post"}).then(res => {
  //         this.props.sendMessage(this.state.user.name +' added new post');
  //         alert('new post added successfully');
  //       });
      
  //   }).catch(( {response} ) => {
  //       const errors = response.data.errors ? response.data.errors : {};
  //       errors.summary = response.data.message;
  //       this.setState({
  //         errors
  //       });
  //     });
  // }


  // manageSockets = () => {
  //   console.log(this._isMounted);
  //     if((this.props.socketData === 'message')){
  //     let mynotifications = [];
  //     let newNotification = 0;
  //     API.getAct(this.props.token).then(result => {
  //       for (let i = 0; i < result.data.items.act; i++) {
  //         if(result.data.items.act[i].isView === false) newNotification++;
  //         mynotifications.push(result.data.items.act[i]);  
  //       }  
  //       this.setState({notifications: this.state.notifications + newNotification,
  //       notificationList: mynotifications})
  //     }).catch(err => console.log(err))
      
  //     }
  // }

  /**
   * @description Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  // changeUser = event => {
  //   const field = event.target.name;
  //   const post = this.state.post;
  //   post[field] = event.target.value;

  //   this.setState({
  //     post
  //   });
  // }

  /**
   *@description Render the component.
   */
  render() {
    return (
      <PostForm
        onSubmit={this.props.handleAddNews}
        onChange={this.props.changePost}
        errors={this.props.errors}
        // user={this.state.user}
        post={this.props.post}
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
