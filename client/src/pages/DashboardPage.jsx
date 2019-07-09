import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';
import PersistentDrawerLeft from '../components/dashboard/header/PersistentDrawerLeft';
import SignUpPage from './SignUpPage';
import PortfolioPage from './PortfolioPage';
import AddNewsPage from './AddNewsPage';
// import EditEmployeePage from './EditEmployeePage';
import { white } from 'material-ui/styles/colors';
import { Card, CardTitle, CardActions} from 'material-ui/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Uploader from '../components/image-upload/Image-upload';


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


/**
 * @description dashboard modal form
 * @param {*} props 
 */
const Modal = props => {
  return (
    <div className={props.show === true? "modal display-block" : "modal display-none"} style={{zIndex: "10000"}}>
    {(props.postSelected.title)?
      <section className="modal-main" style={{textAlign:"center"}}>
       <FormControl margin="normal" required fullWidth  style={{textAlign:"center"}}>
        <TextField data-id="title" style={{textAlign:"center", paddingLeft:"5px"}} autoFocus 
              onChange={props.onChangeModel} value={props.postModel.title} placeholder={props.postSelected.title}
              floatingLabelText="Title"
              />
       </FormControl>
       <FormControl margin="normal" required fullWidth  style={{textAlign:"center", paddingLeft:"5px"}}>  
        <TextField data-id="subtitle"  
            onChange={props.onChangeModel} value={props.postModel.subtitle} placeholder={props.postSelected.subtitle}
            floatingLabelText="Subtitle"
            />
      </FormControl>
      <div style={{margin:'10px'}}>
        <Uploader handleFileUpload={props.handleFileUpload}/>
          <img style={{width:'200px', height:'200px'}} 
            src={((props.uploadedImg)&&(props.uploadedImg !== ''))?
              String(window.location).includes('localhost')?
              `http://localhost:3001/post/getImage/${props.uploadedImg}`:
              `https://final-mongo.herokuapp.com/post/getImage/${props.uploadedImg}`
              :((props.postSelected.imageAddress)&&(String(window.location).includes('localhost')))?
              `http://localhost:3001/post/getImage/${props.postSelected.imageAddress}`:
              (props.postSelected.imageAddress)?
              `https://final-mongo.herokuapp.com/post/getImage/${props.postSelected.imageAddress}`:'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif'
              } alt="post"/>
        </div>
        <span>
          <textarea data-id="context"  style={{width:'99%', minHeight:'100px' , height:'auto'}}
            onChange={props.onChangeModel} value={props.postModel.context} placeholder={props.postSelected.context}
            ></textarea>
        </span>
        <Button variant="contained" color="secondary" style={{textAlign:"center"}} onClick={props.handleClose}>close</Button>
        <button className="btn-update" variant="contained" color="secondary" data-id={props.postSelected._id} value="update" onClick={props.handleUpdatePost}>UPDATE</button>
        </section>:
        <section className="modal-main" style={{textAlign:"center"}}>
          <FormControl margin="normal" required fullWidth  style={{textAlign:"center"}}>
            <TextField data-id="name" style={{textAlign:"center", paddingLeft:"5px"}} autoFocus 
                  onChange={props.onChangeUserModel} value={props.userModel.name} placeholder={props.postSelected.name}
                  floatingLabelText="Name"
                  />
        </FormControl>
        <FormControl margin="normal" required fullWidth  style={{textAlign:"center"}}>
            <TextField data-id="email" style={{textAlign:"center", paddingLeft:"5px"}} autoFocus 
                  onChange={props.onChangeUserModel} value={props.userModel.email} placeholder={props.postSelected.email}
                  floatingLabelText="Email"
                  />
        </FormControl>
        <div style={{margin:'10px'}}>
          <Uploader handleFileUpload={props.handleFileUpload}/>
            <img style={{width:'200px', height:'200px'}} 
              src={((props.uploadedImg)&&(props.uploadedImg !== ''))?
                String(window.location).includes('localhost')?
                `http://localhost:3001/post/getImage/${props.uploadedImg}`:
                `https://final-mongo.herokuapp.com/post/getImage/${props.uploadedImg}`
                :((props.postSelected.avatar)&&(String(window.location).includes('localhost')))?
                `http://localhost:3001/post/getImage/${props.postSelected.avatar}`:
                (props.postSelected.avatar)?
                `https://final-mongo.herokuapp.com/post/getImage/${props.postSelected.avatar}`: 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'
                } alt="post"/>
        </div>
        <Button variant="contained" color="secondary" style={{textAlign:"center"}} onClick={props.handleClose}>close</Button>
        <button className="btn-update" variant="contained" color="secondary" data-id={props.postSelected._id} value="update" onClick={props.handleUpdateUser}>UPDATE</button>
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
              <img src={props.post.imageAddress?
                         String(window.location).includes('localhost')?
                          `http://localhost:3001/post/getImage/${props.post.imageAddress}`:
                          `https://final-mongo.herokuapp.com/post/getImage/${props.post.imageAddress}`:
                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDXm4KO9UivJ8YLE7THqigiC8DVut1N2gFjp-H-xBlU2HVXIR'} style={styles.img} alt="new Post"/>
          </div> 
          <div className="news-header">
              <h4><strong>{props.post.title}</strong></h4>
              <p>{props.post.subtitle}</p>
              <button className="btn-post" data-id={props.post._id} value="read" onClick={props.handleOpen}>read more</button>
              <button className="btn-update" data-id={props.post._id} value="delete" onClick={props.handleDeletePost}>delete</button>
          </div>
      </div> :
      (props.user.access === 1)?
      <div className= "news-grid" key={props.post._id}>
        <div>
          <img src={props.post.avatar?
              String(window.location).includes('localhost')?
              `http://localhost:3001/post/getImage/${props.post.avatar}`:
              `https://final-mongo.herokuapp.com/post/getImage/${props.post.avatar}`:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDXm4KO9UivJ8YLE7THqigiC8DVut1N2gFjp-H-xBlU2HVXIR'} style={styles.img} alt="new Post"/>
        </div>
        <div className="news-header">
            <h4>Employee: <strong>{props.post.name}</strong></h4>
            <p>{props.post.email}</p>
              <button className="btn-post" data-id={props.post._id} value="read" onClick={props.handleOpen}>read more</button>
              <button className="btn-update" data-id={props.post._id} value="delete" onClick={props.handleDeleteUser}>delete</button>
        </div>
      </div> :null
      }
  </div>
);


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
    uploadedImg: '',
    searchVal: '',//search navbar var
    posts:[], //all post + users
    allData: [],
    allDataSearch: [],
    total: 0,//lazy loading
    currentCount:0,
    offset:3,
    list:[],
    isFetching:false,
    userPosts: [],//posts for update
    seleced: [],//show on modal
    postSelected: {},
    postModel: {
      title: '',//update post
      subtitle: '',
      context: '',
      imageAddress: ''
  },
  userModel: {
    name: '',//update user
    email: '',
    avatar: ''
},
  actList:[],
  viewPost:0,
  post: {
    title: '',
    subtitle: '',
    context: '',
    imageAddress: ''
  },
  errors: {}
  }

  
  /**
   * @description This method will be executed after initial rendering.
   */
  componentDidMount() {console.log('dash componentDidMount')
    this._isMounted = true;
    window.addEventListener('scroll', this.loadOnScroll);
    this.loadInitialContent();
  }

  componentWillUnmount(){console.log('dash componentwillMount')
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
    this.setState({ postSelected: {},openModal: false , uploadedImg: ''});
  };


  handleDeletePost = (event) => {
    event.preventDefault();
    let postId = event.target.getAttribute('data-id');
     API.removePost(this.state.token, postId).then(res => {
      const allSrverdata = res.data.items.posts.concat(res.data.items.members);
      const val = (document.getElementById('search-private').value).trim();
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                      (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
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
      const val = (document.getElementById('search-private').value).trim();
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                      (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
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
    const selected = this.state.postModel;
    if(this.state.uploadedImg !== '') selected.imageAddress = this.state.uploadedImg;
     API.updatePost(this.state.token, {postId, selected}).then(res => {
      const allSrverdata = res.data.items.posts.concat(res.data.items.members);
      const val = (document.getElementById('search-private').value).trim();
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                      (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
        let ary = (selection).slice(0,this.state.offset);
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: selection, total: selection.length, open: false, postModel: {}});
      }else{
        let ary = [];
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: [], total: 0, open: false, postModel: {}});
      }

      alert(res.data.message);
     })
  };


  handleUpdateUser = (event) => {
    event.preventDefault();
    let userId = event.target.getAttribute('data-id');
    const selected = this.state.userModel;
    if(this.state.uploadedImg !== '') selected.avatar = this.state.uploadedImg;
     API.updateUser(this.state.token, {userId, selected}).then(res => {
       console.log(res)
      const allSrverdata = res.data.items.posts.concat(res.data.items.members);
      const val = (document.getElementById('search-private').value).trim();
      if(val !== ''){
        const selection = allSrverdata.filter(e => 
          (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                      (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                      ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
        let ary = (selection).slice(0,this.state.offset);
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: selection, total: selection.length, open: false, postModel: {}});
      }else{
        let ary = [];
        this.setState({list:ary});
      this.setState({allData: allSrverdata, allDataSearch: [], total: 0, open: false, postModel: {}});
      }

      alert(res.data.message);
     })
  };

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
   * @description Process the form.
   * @description create a string for an HTTP body message
   *
   * @param {object} event - the JavaScript event object
   */
  handleAddNews = event => {
    event.preventDefault();
    const { title, subtitle, imageAddress, context} = this.state.post;
    const avatar = this.state.uploadedImg;
    const userId = this.state.user._id;
    API.addPosts(this.state.token,{userId, title, subtitle, avatar, context}).then(res => {
      this.loadInitialContent();
    }).then(res => {
      API.addAct(this.state.token, {userId, act:"added new post"}).then(res => {
          this.props.sendMessage(this.state.user.name +' added new post');
          var mydiv = document.getElementById("upload-msg");
          mydiv.innerHTML = "";
          this.setState({post: {
            title: '',
            subtitle: '',
            context: '',
            imageAddress: ''
          }, uploadedImg: '', file: null})
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

  /************* */
  //   const allSrverdata = res.data.items.posts.concat(res.data.items.members);
  //   const val = (document.getElementById('search-private').value).trim();
  //   if(val !== ''){
  //     const selection = allSrverdata.filter(e => 
  //       (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
  //                   ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
  //                   ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
  //                   (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
  //                   ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
  //     let ary = (selection).slice(0,this.state.offset);
  //     this.setState({list:ary});
  //   this.setState({allData: allSrverdata, allDataSearch: selection, total: selection.length, open: false});
  //   }else{
  //     let ary = [];
  //     this.setState({list:ary});
  //   this.setState({allData: allSrverdata, allDataSearch: [], total: 0, open: false});
  //   }


  //   alert(res.data.message);
    
  //  })
   /******************* */


    /**
   * @description get all post and divide them 3 post 3 post for lazy loading
   * @description use _isMounted just for set state one time that page load
   */
  loadInitialContent(){
    if (this._isMounted){
    API.dashboard(Auth.getToken())
    .then(res => {
      let viewPost = 0;
      const alldata = res.data.items.posts.concat(res.data.items.members);
      (res.data.items.act).forEach(e => {
       if(e.isView === false)  viewPost++;
     });
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
          allData: alldata,
          actList: res.data.items.act,
          viewPost: viewPost
        });
    }).catch((err) => alert("we have some problem in database please run agin or call for support")); 
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
    this.setState({
      dashboard:false,
      portfolio: true, 
      addEmployee: false,
      addNews: false,
      editEmployee: false,
      open: false,
      searchVal: '',
      list: [],
      uploadedImg: ''
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
      list: [],
      uploadedImg: ''
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
      list: [],
      uploadedImg: ''
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
      list: [],
      uploadedImg: ''
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
      list: [],
      uploadedImg: ''
    });
  }

 insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

  
  handleFileUpload = (event) => {
    var mydiv = document.getElementById("upload-msg");
    mydiv.innerHTML = "please wait ...";
    this.setState({file: event.target.files[0]});

    const data = new FormData();
    data.append('file', event.target.files[0]);
    if(event.target.files[0] !== undefined){
      data.append('filename', (event.target.files[0].name));

    API.uploadFile(Auth.getToken(),data).then((response) => {
      mydiv.innerHTML = "file uploaded";
      this.setState({uploadedImg: response.data})   
    });
    } else mydiv.innerHTML = "";
    
  }

  loadOnScroll = (e) =>{
    if(this.state.currentCount === this.state.total) return;
    const el = document.getElementById('contentd-end');
    if(el){

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
      const val = (document.getElementById('search-private').value).trim();
      let selection = [];
      if(document.getElementById('search-private').value === ' ') selection = this.state.allData; 
      else  selection = this.state.allData.filter(e => 
        (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                    (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
      console.log('handle change' + selection.length)
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
    let val = (document.getElementById('search-private').value).trim();
    if(document.getElementById('search-private').value === ' ') {
      const selection = this.state.allData;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
      this.setState({searchVal: '', allDataSearch: selection, total: selection.length, open: false});
    }
    else if(val !== ''){
      const selection = this.state.allData.filter(e => 
        (e.title)? (((e.title.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.subtitle.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.context.toUpperCase()).trim()).includes((val).toUpperCase())):
                    (((e.name.toUpperCase()).trim()).includes((val).toUpperCase()) || 
                    ((e.email.toUpperCase()).trim()).includes((val).toUpperCase())));
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

  onChangeModel = (event) => {
    const field = event.target.getAttribute('data-id');
    const postModel = this.state.postModel;
    postModel[field] = event.target.value;

    this.setState({
      postModel
    });
  }

  onChangeUserModel = (event) => {
    const field = event.target.getAttribute('data-id');
    const userModel = this.state.userModel;
    userModel[field] = event.target.value;

    this.setState({
      userModel
    });
  }


  /**
   * @description Render the component.
   */
  render() {
    return (
      <div>
        {console.log('dashboard**********')}
        {console.log(this.state.allData.length)}
        <PersistentDrawerLeft token={this.state.token} imgAdd={this.state.imgAdd}
         user={this.state.user} open={this.state.open} 
         addEmployeeCLick={this.addEmployeeCLick} portfolioCLick={this.portfolioCLick} 
         dashboardCLick={this.dashboardCLick} addNewsCLick={this.addNewsCLick} 
         handleDrawerClose={this.handleDrawerClose} handleDrawerOpen={this.handleDrawerOpen}
         posts={this.state.posts} members={this.state.members} searchVal={this.state.searchVal} 
         SearchOpration={this.SearchOpration} handleChange={this.handleChange}
         socketData={this.props.socketData}  notificationList={this.props.notificationList} 
         notifications={this.props.notifications} actList={this.state.actList}
         sendMessage = { this.sendMessage } socket = { this.props.socket } viewPost={this.state.viewPost}
         handleClickNotification={this.props.handleClickNotification}/>
        <main className={(this.state.open === false)?"content contentShift": "content "}>
          <div className="drawerHeader"/>
          {(this.state.searchVal.length > 0)?
            <div className="post-loc">
              <CardTitle  title="Search" subtitle="search all post and modigy your posts" style={{textAlign:"center"}}/>
                {this.state.list.length > 0 ?(this.state.list).map((e,i) =>  
                  <PostForm handleOpen={this.handleOpen} post={e} user={this.state.user} key={i} handleUpdateUser={this.handleUpdateUser} handleUpdatePost={this.handleUpdatePost} handleDeleteUser={this.handleDeleteUser} handleDeletePost={this.handleDeletePost}/>):
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
                    <Modal 
                      handleFileUpload={this.handleFileUpload} uploadedImg={this.state.uploadedImg} 
                      onChangeUserModel={this.onChangeUserModel} onChangeModel={this.onChangeModel} 
                      postModel={this.state.postModel} userModel={this.state.userModel}
                      handleUpdatePost={this.handleUpdatePost} handleUpdateUser={this.handleUpdateUser}
                      show={this.state.openModal} handleClose={this.handleClose} 
                      postSelected={this.state.postSelected} user={this.state.user} style={{textAlign: "center"}} />
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
                <Modal 
                  handleFileUpload={this.handleFileUpload} uploadedImg={this.state.uploadedImg} 
                  onChangeUserModel={this.onChangeUserModel} onChangeModel={this.onChangeModel} 
                  postModel={this.state.postModel} userModel={this.state.userModel}
                   handleUpdatePost={this.handleUpdatePost} handleUpdateUser={this.handleUpdateUser}
                   show={this.state.openModal} handleClose={this.handleClose} postSelected={this.state.postSelected} 
                   user={this.state.user} style={{textAlign: "center"}}/>
              </div>
              :
                (this.state.portfolio === true)?
            <PortfolioPage uploadedImg={this.state.uploadedImg} secretData={this.state.secretData} user={this.state.user} 
               token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
            (this.state.addEmployee === true)?
              <SignUpPage uploadedImg={this.state.uploadedImg} secretData={this.state.secretData}
                 user={this.state.user} token={this.state.token} imgAdd={this.state.imgAdd}   
                 handleFileUpload={this.handleFileUpload} file={this.state.file}/>:
              (this.state.addNews === true)?
              <AddNewsPage uploadedImg={this.state.uploadedImg} socket = { this.props.socket }
                 sendMessage = { this.props.sendMessage } secretData={this.state.secretData} post={this.state.post} 
                 token={this.state.token} imgAdd={this.state.imgAdd}  handleFileUpload={this.handleFileUpload} 
                 file={this.state.file} handleAddNews={this.handleAddNews} changeUser={this.changeUser} errors={this.state.errors}/>:
              // (this.state.editEmployee === true)?
              // <EditEmployeePage secretData={this.state.secretData} user={this.state.user} 
              // token={this.state.token} imgAdd={this.state.imgAdd} handleFileUpload={this.handleFileUpload}
              //  file={this.state.file}/>:           
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
