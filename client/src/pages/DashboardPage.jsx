import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';
import PersistentDrawerLeft from '../components/dashboard/header/PersistentDrawerLeft';
import SignUpPage from './SignUpPage';
import PortfolioPage from './PortfolioPage';
import AddNewsPage from './AddNewsPage';
import EditEmployeePage from './EditEmployeePage';
import { white } from 'material-ui/styles/colors';
import { Card, CardTitle, CardActions} from 'material-ui/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * @description Optional Import for upload images in aws.amazon.com
 */
import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'final-project-gt',
    dirName: 'photos',
    region: 'us-east-2',
    accessKeyId: 'AKIAIW7332XREZCP7M5A',
    secretAccessKey: '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',
}

/**
 * @description dashboard modal form
 * @param {*} props 
 */
const Modal = props => {
  return (
    <div className={props.show === true? "modal display-block" : "modal display-none"}>
    {(props.postSelected.title)?
      <section className="modal-main" style={{textAlign:"center"}}>
        <h4 style={{textAlign:"center"}}>{props.postSelected.title}</h4>
        <p style={{textAlign:"center"}}><strong>{props.postSelected.subtitle}</strong></p>
        <div>
          <img style={{width:'200px', height:'200px'}} src={props.postSelected.imageAddress} alt="post image"/>
        </div>
        <span>
          <p>
          {props.postSelected.context}
          </p>
        </span>
        <button style={{textAlign:"center"}} onClick={props.handleClose}>close</button>
        <button data-id={props.postSelected._id} value="update" onClick={props.handleUpdatePost}>update</button>
        </section>:
        <section className="modal-main" style={{textAlign:"center"}}>
          <h4 style={{textAlign:"center"}}>{props.postSelected.name}</h4>
          <p style={{textAlign:"center"}}><strong>{props.postSelected.email}</strong></p>
        <div>
          <img style={{width:'200px', height:'200px'}} src={props.postSelected.avatar} alt="user avatar"/>
        </div>
        <button style={{textAlign:"center"}} onClick={props.handleClose}>close</button>
        <button data-id={props.postSelected._id} value="update" onClick={props.handleUpdatePost}>update</button>
        </section>
        }
    </div>
  );
};

/**
 * @description dashboard post form
 * @param {*} props 
 */
const PostForm = props => (
    <div className="news-container" data-news={props.post._id}>
      {props.post.title?
        <div className= "news-grid" key={props.post._id}>
          <div>
              <img src={String(props.post.imageAddress)} style={styles.img} alt="new Post"/>
          </div> 
          <div className="news-header">
              <h4><strong>{props.post.title}</strong></h4>
              <p>{props.post.subtitle}</p>
              <button data-id={props.post._id} value="read" onClick={props.handleOpen}>read more</button>
              <button data-id={props.post._id} value="update" onClick={props.handleUpdatePost}>update</button>
              <button data-id={props.post._id} value="delete" onClick={props.handleDeletePost}>delete</button>
          </div>
      </div> :
      (props.user.access === 1)?
      <div className= "news-grid" key={props.post._id}>
        <div>
            <img src={String(props.post.avatar)} style={styles.img} alt="new Post"/>
        </div> 
        <div className="news-header">
            <h4>Employee: <strong>{props.post.name}</strong></h4>
            <p>{props.post.email}</p>
              <button data-id={props.post._id} value="read" onClick={props.handleOpen}>read more</button>
              {/* <button data-id={props.post._id} value="update" onClick={props.handleUpdateUser}>update</button> */}
              <button data-id={props.post._id} value="delete" onClick={props.handleDeleteUser}>delete</button>
        </div>
      </div> :null
      }
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
    secretData: '',//loged in user info and message
    user: {},
    token: '',
    open: false,//drowerside var
    dashboard: true,
    portfolio: false,
    addEmployee: false,
    addNews: false,
    editEmployee: false,
    file: null,//upload file var
    imgAdd: '',
    searchVal: '',//search navbar var
    posts:[], //all post + users
    // members: [],
    allData: [],
    allDataSearch: [],
    // postList:[],
    // memberList:[],
    total: 0,//lazy loading
    currentCount:0,
    offset:3,
    list:[],
    isFetching:false,
    userPosts: [],//posts for update
    seleced: [],//show on modal
    postSelected: {},
    notifications: 0,//notifications
    notificationList: []
  }

  manageSockets = () => {

    if(this.props.socketData === {}){
      if(this.props.socketData.length !== 0){
      // console.log('**********')
      let mynotifications = this.state.notificationList;
      mynotifications.push(this.props.socketData);
      this.setState({notifications: this.state.notifications + 1,
      notificationList: mynotifications})
      }
    }
  }

    /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', this.loadOnScroll);
    this.loadInitialContent();
  }

  componentWillUnmount(){
    this._isMounted = false;
    window.removeEventListener('scroll', this.loadOnScroll);
  }

  
  handleOpen = (event) => {
    event.preventDefault();
    let postId = event.target.getAttribute('data-id');
      const selected = this.state.allData.filter(e => e._id === postId);
      this.setState({postSelected: selected[0], openModal: true });
  };

  handleClose = () => {
    this.setState({ postSelected: {},openModal: false });
  };


  handleDeletePost = (event) => {
    event.preventDefault();
    let postId = event.target.getAttribute('data-id');
    console.log(postId)
    console.log(this.state.token)
     API.removePost(this.state.token, postId).then(res => {


      const allSrverdata = res.data.items.posts.concat(res.data.items.members);
      const val = document.getElementById('search-private').value;
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? ((e.title.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.subtitle.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.context.toUpperCase()).includes((val).toUpperCase())):
                      ((e.name.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.email.toUpperCase()).includes((val).toUpperCase())));
        let ary = (selection).slice(0,this.state.offset);
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: selection, total: selection.length, open: false});
      }else{
        let ary = [];
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: [], total: 0, open: false});
      }


      alert(res.data.message);
      
     })
  };


  handleDeleteUser = (event) => {
    event.preventDefault();
    let postId = event.target.getAttribute('data-id');
     API.removeUser(this.state.token, postId).then(res => {
      const allSrverdata = res.data.items.posts.concat(res.data.items.members);
      const val = document.getElementById('search-private').value;
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? ((e.title.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.subtitle.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.context.toUpperCase()).includes((val).toUpperCase())):
                      ((e.name.toUpperCase()).includes((val).toUpperCase()) || 
                      (e.email.toUpperCase()).includes((val).toUpperCase())));
        let ary = (selection).slice(0,this.state.offset);
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: selection, total: selection.length, open: false});
      }else{
        let ary = [];
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: [], total: 0, open: false});
      }


      alert(res.data.message);
      
     })
  };


  handleUpdatePost = (event) => {
    event.preventDefault();
    let postId = event.target.getAttribute('data-id');
    const selected = this.state.allData.filter(e => e._id === postId);
     API.updatePost(this.state.token, selected).then(res => {
      alert(res.data.message);
     })
  };


    /**
   * @description get all post and divide them 3 post 3 post for lazy loading
   * @description use _isMounted just for set state one time that page load
   */
  loadInitialContent(){
    if (this._isMounted){
    API.dashboard(Auth.getToken())
    .then(res => {
      
      const alldata = res.data.items.posts.concat(res.data.items.members);
      console.log(alldata)
      console.log('alldata')
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
    }).catch((err) => console.log(err)); 
  }
  }



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  portfolioCLick = e => {
    e.preventDefault();
    {console.log(this.state.user)}
    this.setState({
      dashboard:false,
      portfolio: true, 
      addEmployee: false,
      addNews: false,
      editEmployee: false,
      open: false,
      searchVal: '',
      list: []
    });
  }

  addEmployeeCLick = e => {
    e.preventDefault();
    this.setState({
      portfolio: false, 
      addEmployee: true,
      addNews: false,
      editEmployee: false,
      open: false,
      searchVal: '',
      list: []
    });
  }

  addNewsCLick = e => {
    e.preventDefault();
    this.setState({
      dashboard:false,
      portfolio: false, 
      addEmployee: false,
      addNews: true,
      editEmployee: false,
      open: false,
      searchVal: '',
      list: []
    });
  }

  editEmployeeCLick = e => {
    e.preventDefault();
    this.setState({
      dashboard:false,
      portfolio: false, 
      addEmployee: false,
      addNews: false,
      editEmployee: true,
      open: false,
      searchVal: '',
      list: []
    });
  }

  dashboardCLick = e => {
    e.preventDefault();
    this.setState({
      dashboard:true,
      portfolio: false, 
      addEmployee: false,
      addNews: false,
      editEmployee: false,
      open: false,
      searchVal: '',
      list: []
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

  loadOnScroll = (e) =>{console.log('scroll')
  console.log(this.state.currentCount + '***' + this.state.total)
    if(this.state.currentCount === this.state.total) return;
    const el = document.getElementById('contentd-end');
    if(el){

      var rect = el.getBoundingClientRect();
    let isAtEnd = (rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) 
    if(isAtEnd){
      console.log(this.state.isFetching)
      if(!this.state.isFetching){

        this.setState({isFetching:true});

        setTimeout(() => {
          var count = this.state.currentCount + this.state.offset;
          console.log('this.state.count')
          console.log(this.state.count)
          if(count > this.state.total) count = this.state.total;
          if(this.state.currentCount !== this.state.total){
            console.log(this.state.allData)
            this.setState({
              isFetching:false,
              currentCount:count,
              list: (this.state.allDataSearch).slice(0, count)
            })
          }
        }, 1000);
      }
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
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, allDataSearch: selection, total: selection.length, open: false});
    }else{
      let ary = [];
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, allDataSearch: [], total: 0, open: false});
    }
    
  }
  

  SearchOpration = (event) => {
    event.preventDefault();
    let val = document.getElementById('search-private').value;
    
    if(val !== ''){console.log('enter ' + val)
      const selection = this.state.allData.filter(e => 
        (e.title)? ((e.title.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.subtitle.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.context.toUpperCase()).includes((val).toUpperCase())):
                    ((e.name.toUpperCase()).includes((val).toUpperCase()) || 
                    (e.email.toUpperCase()).includes((val).toUpperCase())));
        console.log(selection)
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
      this.setState({searchVal: '', allDataSearch: selection, total: selection.length, open: false});
    }else{
      const selection = this.state.allData;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:[]});
    this.setState({searchVal: '', allDataSearch: selection, total: selection.length, open: false});
    }
    document.getElementById('search-private').value = '';
  }




  /**
   * @description Render the component.
   */
  render() {
    return (
      <div>
        <PersistentDrawerLeft token={this.state.token} imgAdd={this.state.imgAdd}
         user={this.state.user} open={this.state.open} 
         addEmployeeCLick={this.addEmployeeCLick} portfolioCLick={this.portfolioCLick} dashboardCLick={this.dashboardCLick} addNewsCLick={this.addNewsCLick} 
         handleDrawerClose={this.handleDrawerClose} handleDrawerOpen={this.handleDrawerOpen}
         posts={this.state.posts} members={this.state.members} searchVal={this.state.searchVal} 
         SearchOpration={this.SearchOpration} handleChange={this.handleChange}
         socketData={this.props.socketData} manageSockets={this.manageSockets} notificationList={this.state.notificationList} 
         notifications={this.notifications}/>
        <main className={(this.state.open === false)?"content contentShift": "content "}>
          <div className="drawerHeader"/>
          {(this.state.searchVal.length > 0)?
            <div className="post-loc">
              <CardTitle  title="Search" subtitle="search all post and modigy your posts" style={{textAlign:"center"}}/>
                {this.state.list.length > 0 ?(this.state.list).map((e,i) =>  
                  <PostForm handleOpen={this.handleOpen} post={e} user={this.state.user} key={i} handleUpdatePost={this.handleUpdatePost} handleDeleteUser={this.handleDeleteUser} handleDeletePost={this.handleDeletePost}/>):
                  <Card>
                    <CardTitle>We Have not this word on searched memory</CardTitle>
                  </Card>
                }
                {
                  (this.state.currentCount !== this.state.total)?
                    <CardActions id="contentd-end" style={{textAlign:"center"}}>
                      <CircularProgress className="test2" variant="indeterminate" disableShrink style={styles.facebook} size={24} thickness={4}/>
                    </CardActions>: null
                }
                    <Modal handleUpdatePost={this.handleUpdatePost} show={this.state.openModal} handleClose={this.handleClose} postSelected={this.state.postSelected} user={this.state.user}/>
                </div>:
                this.state.list.length > 0 ?
                <div className="post-loc">
                 <CardTitle style={{textAlign: "center"}}  title="New Posts" subtitle="recent most important news about our group" />
                {(this.state.list).map((e,i) =>  
                  <PostForm handleOpen={this.handleOpen} post={e} user={this.state.user} key={i} handleDeletePost={this.handleDeletePost}/>)}                
                 {
                   (this.state.currentCount !== this.state.total)?
                    <CardActions style={{textAlign: "center"}} id="content-end" >
                      <CircularProgress className="test2" variant="indeterminate" disableShrink style={styles.facebook} size={24} thickness={4}/>
                    </CardActions>: null
                }
                <Modal style={{textAlign: "center"}} show={this.state.openModal} handleClose={this.handleClose} postSelected={this.state.postSelected} user={this.state.user}/>
              </div>
              :
                (this.state.portfolio === true)?
            <PortfolioPage secretData={this.state.secretData} user={this.state.user}  token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
            (this.state.addEmployee === true)?
              <SignUpPage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}   handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.addNews === true)?
              <AddNewsPage socket = { this.props.socket } sendMessage = { this.props.sendMessage } secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.editEmployee === true)?
              <EditEmployeePage secretData={this.state.secretData} user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd} handleFileUpload={this.handleFileUpload} file={this.state.file}/>:           
              (this.state.dashboard === true)?
            
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
