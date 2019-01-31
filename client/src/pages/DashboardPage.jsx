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
import { Card, CardText   , CardTitle, CardActions} from 'material-ui/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

//Optional Import for upload images in aws.amazon.com
import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'final-project-gt',
    dirName: 'photos',
    region: 'us-east-2',
    accessKeyId: 'AKIAJNNJ3YO2VQIQ25BA',
    secretAccessKey: '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',
}

const Modal = props => {
  return (
    <div className={props.show === true? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
      <h4>{props.postSelected.title}</h4>
      <p><strong>{props.postSelected.subtitle}</strong></p>
      <span>
        <p>
        {props.postSelected.context}
        </p>
      </span>
      <p></p>
        {props.children}
        <button onClick={props.handleClose}>close</button>
      </section>
    </div>
  );
};

const PostForm = props => (
  <div className="news-container" data-news={props.post._id}>
      {/* <img src={postImg} alt="Recipe" id="post-bg"/> */}
      <div className= "news-grid" key={props.post._id}>
        <div>
            <img src={String(props.post.imageAddress)} style={styles.img} alt="new Post"/>
        </div> 
        <div className="news-header">
            <h4><strong>{props.post.title}</strong></h4>
            <p>{props.post.subtitle}</p>
              <button id={props.post._id}  onClick={props.handleOpen}>read more</button>
        </div>
  </div>  
  </div>
);


const styles = {
  loading:{
    padding: "10px",
    width: "350px",
    left: "34%",
    position: "relative",
    margin:"52px"
  },
  facebook: {
    margin: "20px",
    position: 'relative',
  },
  img:{
    width: '110px',
    height: '110px',
    margin: "3px"
    }
}



class DashboardPage extends React.Component {
  _isMounted = false;
  state = {
    secretData: '',
    user: {},
    token: '',
    open: false,
    dashboard: true,
    portfolio: false,
    addEmployee: false,
    addNews: false,
    editEmployee: false,
    file: null,
    imgAdd: '',
    // onloadImg: false,
    searchVal: '',
    searchResult: {},
    posts:[], 
    members: [],
    allData: [],
    allDataSearch: [],
    postList:[],
    memberList:[],
    total: 0,
    list:[],
    userPosts: []
  }

    /**
   * This method will be executed after initial rendering.
   */
  componentWillMount() {
    this._isMounted = true;
    window.addEventListener('scroll', this.props.loadOnScroll);
    this.loadInitialContent();
  }

  componentWillUnmount(){
    this._isMounted = false;
    window.removeEventListener('scroll', this.loadOnScroll);
  }

  loadInitialContent(){
    if (this._isMounted){
    API.dashboard(Auth.getToken())
    .then(res => { console.log(res.data.user.post)
      const alldata = res.data.items.posts.concat(res.data.items.members);
      this.setState({
          secretData: res.data.message,
          user: res.data.user,
          userPosts: res.data.user.post,
          token: Auth.getToken(),
          posts: res.data.items.posts,
          members: res.data.items.members,
          postList: res.data.items.posts,
          memberList: res.data.items.members,
          total: (alldata.length),
          allDataSearch: alldata,
          allData: alldata
        });
    })
  }
  }



  SearchOpration = (event) => {
    event.preventDefault();
    let val = document.getElementById('search-private').value;
    
    if(val !== ''){
      const selection = this.state.allData.filter(e => 
        (e.title)? ((e.title.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.subtitle.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.context.toUpperCase()).includes((val).toUpperCase())):
                    ((e.name.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.email.toUpperCase()).includes((val).toUpperCase())));
        console.log(selection)
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
      this.setState({searchVal: '', allDataSearch: selection, total: selection.length});
    }else{
      const selection = this.state.news;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: '', allDataSearch: selection, total: selection.length});
    }
    val = '';
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
      dashboard:false,
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
      dashboard:false,
      portfolio: false, 
      addEmployee: false,
      addNews: true,
      editEmployee: false
    });
  }

  editEmployeeCLick = e => {
    e.preventDefault();
    this.setState({
      dashboard:false,
      portfolio: false, 
      addEmployee: false,
      addNews: false,
      editEmployee: true
    });
  }

  dashboardCLick = e => {
    e.preventDefault();
    this.setState({
      dashboard:true,
      portfolio: false, 
      addEmployee: false,
      addNews: false,
      editEmployee: false
    });
  }

 insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

  
  handleFileUpload = (event) => {
    var mydiv = document.getElementById("upload-msg");
    mydiv.innerHTML = "please wait ...";
    this.setState({file: event.target.files[0]});
    uploadFile(event.target.files[0] , config)
    .then(data => {
      this.setState({imgAdd: data.location});
      mydiv.innerHTML = "File uploaded";
    })
    .catch(err => {
      mydiv.innerHTML = "";
      alert('problem in uploading image please try it later or call to suport services');
    })
  }

  loadOnScroll = (e) =>{
    if(this.state.currentCount === this.state.total) return;
    const el = document.getElementById('content-end');
    var rect = el.getBoundingClientRect();
    let isAtEnd = (rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) 
    if(isAtEnd){
      if(!this.state.isFetching){

        this.setState({isFetching:true});

        setTimeout(() => {
          var count = this.state.currentCount + this.state.offset;
          if(count > this.state.total) count = this.state.total;
          if(this.state.currentCount !== this.state.total){
            this.setState({
              isFetching:false,
              currentCount:count,
              list: (this.state.allData).slice(0, count)
            })
          }
        }, 1000);
      }
    }
  }

  handleChange = (event) => {
    if(event.target.value !== ''){
      const val = document.getElementById('search-private').value;
      const selection = this.state.allData.filter(e => 
        (e.title)? ((e.title.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.subtitle.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.context.toUpperCase()).includes((val).toUpperCase())):
                    ((e.name.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.email.toUpperCase()).includes((val).toUpperCase())));
        console.log(selection)
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, allDataSearch: selection, total: selection.length});
    }else{
      const selection = this.state.allData;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, allDataSearch: selection, total: selection.length});
    }
    
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <PersistentDrawerLeft token={this.state.token} imgAdd={this.state.imgAdd}
         user={this.state.user} open={this.state.open} 
         addEmployeeCLick={this.addEmployeeCLick} portfolioCLick={this.portfolioCLick} dashboardCLick={this.dashboardCLick} addNewsCLick={this.addNewsCLick} 
         handleDrawerClose={this.handleDrawerClose} handleDrawerOpen={this.handleDrawerOpen}
         posts={this.state.posts} members={this.state.members} searchVal={this.state.searchVal} 
         SearchOpration={this.SearchOpration} handleChange={this.handleChange}/>
        <main className={(this.state.open === false)?"content contentShift": "content "}>
          <div className="drawerHeader"/>
          {(this.state.portfolio === true)?
            <PortfolioPage secretData={this.state.secretData} user={this.state.user}  token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
            (this.state.addEmployee === true)?
              <SignUpPage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}   handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.addNews === true)?
              <AddNewsPage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.editEmployee === true)?
              <EditEmployeePage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd} handleFileUpload={this.handleFileUpload} file={this.state.file}/>:           
              ( (this.state.dashboard === true)&&(this.state.searchVal.length > 0))?
                <div id="post-loc">
                     <CardTitle  title="New Posts" subtitle="recent most important news about our group" />
                    {this.state.list.length > 0 ?(this.state.list).map((e,i) =>  
                        <PostForm handleOpen={this.handleOpen} post={e} key={i}/>):
                            <Card>
                              <CardTitle>We Have not this word on searched memory</CardTitle>
                            </Card>
                            }
                    {
                      (this.state.currentCount !== this.state.total)?
                          <CardActions id="content-end" >
                              <CircularProgress className="test2" variant="indeterminate" disableShrink style={styles.facebook} size={24} thickness={4}/>
                          </CardActions>
                      : null
                    }
                    {/* <Modal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}>
                  <p>searched</p>
                </Modal> */}
                </div>:(this.state.dashboard === true)?
            
            <div>
            <h3 style={{color: white}}>Dear {this.state.user.name}, welcome to your Dashboard</h3>
            <h4 style={{color: white}}>Job Title: {(this.state.user.access === 1)? "Manager": "Employee"}</h4>
            </div>:null
          }
        </main>
        
        
        
        </div>
      );
  }

}

export default DashboardPage;
