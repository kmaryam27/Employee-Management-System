import React from 'react';
import Typography from '@material-ui/core/Typography';
import Auth from '../utils/Auth';
import API from '../utils/API';
import PersistentDrawerLeft from '../components/dashboard/header/PersistentDrawerLeft';
import SignUpPage from './SignUpPage';
import PortfolioPage from './PortfolioPage';
import AddNewsPage from './AddNewsPage';
import EditEmployeePage from './EditEmployeePage';
import { white } from 'material-ui/styles/colors';

//Optional Import for upload images in aws.amazon.com
import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'final-project-gt',
    dirName: 'photos',
    region: 'us-east-2',
    accessKeyId: 'AKIAJDHMIESY3IOZH25A',
    secretAccessKey: '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',
}

class DashboardPage extends React.Component {
  state = {
    secretData: '',
    user: {},
    token: '',
    open: false,
    portfolio: false,
    addEmployee: false,
    addNews: false,
    editEmployee: false,
    file: null,
    imgAdd: '',
    onloadImg: false,
    searchResult: {},
    posts:[], 
    members: []
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentWillMount() {
    API.dashboard(Auth.getToken())
    .then(res => {
      this.setState({
          secretData: res.data.message,
          user: res.data.user,
          token: Auth.getToken(),
          posts: res.data.items.posts,
          members: res.data.members
        });
    })
  }


  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  portfolioCLick = e => {
    e.preventDefault();
    this.setState({
      portfolio: true, 
      addEmployee: false,
      addNews: false,
      editEmployee: false
    });
  }

  addEmployeeCLick = e => {
    e.preventDefault();
    this.setState({
      portfolio: false, 
      addEmployee: true,
      addNews: false,
      editEmployee: false
    });
  }

  addNewsCLick = e => {
    e.preventDefault();
    this.setState({
      portfolio: false, 
      addEmployee: false,
      addNews: true,
      editEmployee: false
    });
  }

  editEmployeeCLick = e => {
    e.preventDefault();
    this.setState({
      portfolio: false, 
      addEmployee: false,
      addNews: false,
      editEmployee: true
    });
  }

 insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

  
  handleFileUpload = (event) => {
    
    this.setState({file: event.target.files[0]});
    uploadFile(event.target.files[0] , config)
    .then(data => {
      this.setState({imgAdd: data.location});
    })
    .catch(err => alert('problem in uploading image please try it later or call to suport services'))
  }

  

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {  console.log(this.state.members)}
        <PersistentDrawerLeft avatar={this.state.user.avatar} token={this.state.token} imgAdd={this.state.imgAdd}
         onloadImg={this.state.onloadImg}  user={this.state.user} open={this.state.open} 
         addEmployeeCLick={this.addEmployeeCLick} portfolioCLick={this.portfolioCLick} addNewsCLick={this.addNewsCLick} 
         handleDrawerClose={this.handleDrawerClose} handleDrawerOpen={this.handleDrawerOpen}
         posts={this.state.posts} members={this.state.members}/>
        <main className={(this.state.open === false)?"content contentShift": "content "}>
          <div className="drawerHeader"/>
          {(this.state.portfolio === true)?
            <PortfolioPage secretData={this.state.secretData} user={this.state.user}  token={this.state.token} imgAdd={this.state.imgAdd} onloadImg={this.state.onloadImg}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
            (this.state.addEmployee === true)?
              <SignUpPage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd} onloadImg={this.state.onloadImg}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.addNews === true)?
              <AddNewsPage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd} onloadImg={this.state.onloadImg}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.editEmployee === true)?
              <EditEmployeePage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}  onloadImg={this.state.onloadImg} handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
            <div>
            <h3 style={{color: white}}>Dear {this.state.user.name}, welcome to your Dashboard</h3>
            <h4 style={{color: white}}>Job Title: {(this.state.user.access === 1)? "Manager": "Employee"}</h4>
            </div>}
        </main>
        
        
        
        </div>
      );
  }

}

export default DashboardPage;
