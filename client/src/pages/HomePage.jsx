import React,{Component} from 'react';
import '../components/home-page/Home-page.css';
import { Card, CardText   , CardTitle, CardActions} from 'material-ui/Card';
import Auth from '../utils/Auth';
import API from '../utils/API';
import Logo from '../components/logo/Logo';
import SearchForm from '../components/search/Search';
import Slider from '../components/slider/Slider';
// import Post from '../components/posts/Post-page';
// import Search from '../components/search/Search-page';
import Footer from '../components/footer/Footer';
import postImg from '../assets/img/post.png';

import '../components/posts/Post-page.css'
import CircularProgress from '@material-ui/core/CircularProgress';


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



class HomePage extends Component {
  _isMounted = false;
  state={
    searchVal: '',
    SearchedPosts:[],

    total:0,
  currentCount:3,
  offset:3,
  list:[],
  news:[],
  isFetching:false,
  selectedId: 0,
  open: false ,
  postSelected: {},
  test:[]
  }


  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', this.loadOnScroll);
    this.loadInitialContent();
  }



  /**
   * @description update authenticated state on logout
   */
  componentWillMount() {
   this.props.toggleAuthenticateStatus();
  }

  componentWillUnmount(){
    this._isMounted = false;
    window.removeEventListener('scroll', this.loadOnScroll);
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
              list: (this.state.news).slice(0, count)
            })
          }
        }, 1000);
      }
    }
  }

    loadInitialContent(){
      API.getPosts()
      .then(res => {
        if (this._isMounted){
          let tot = res.data;
          this.setState(prevState => ({
              news: prevState.news.concat(res.data),
              test: prevState.news.concat(res.data),
              total: tot.length
            }));
          let ary = (this.state.test).slice(0,this.state.offset);
          this.setState({list:ary});
        }
      });
  }


  handleOpen = (event) => {
    event.preventDefault();
    let postId = event.target.id;
    const selected = this.state.news.filter(e => e._id === postId);
    this.setState({postSelected: selected[0], open: true });
  };

  handleClose = () => {
    this.setState({ postSelected: {},open: false });
  };

  handleChange = (event) => {
    // document.getElementById('search').autocomplete = "on";
    if(event.target.value !== ''){
      const val = document.getElementById('search').value;
      const selection = this.state.news.filter(e => ((e.title.toUpperCase()).includes((val).toUpperCase()) || (e.subtitle.toUpperCase()).includes((val).toUpperCase())) || (e.context.toUpperCase()).includes((val).toUpperCase()));
      console.log(selection)
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, test: selection, total: selection.length});
    }else{
      const selection = this.state.news;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: event.target.value, test: selection, total: selection.length});
    }
    
  }

  SearchOpration = (event) => {
    event.preventDefault();
    // document.getElementById('search').autocomplete = "off";
    const val = document.getElementById('search').value;


    if(val !== ''){
      const selection = this.state.news.filter(e => (e.title.toUpperCase()).includes((val).toUpperCase()));
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
      this.setState({searchVal: '', test: selection, total: selection.length});
    }else{
      const selection = this.state.news;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: '', test: selection, total: selection.length});
    }
    
  }

  render() {
    return (
    <div className="home">
        <header className="main-header header-color">
            <Logo/>
            <SearchForm className="main-search" handleChange={this.handleChange} value={this.state.searchVal} SearchOpration={this.SearchOpration}/>
        </header>
        <Slider />
    <Card>
        {Auth.isUserAuthenticated() ? (
          <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome!</CardText>
        ) : (
          <CardText style={{ fontSize: '16px', color: 'red' }}>You are not logged in.</CardText>
        )}
    </Card>
     {this.state.searchVal.length > 0?
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
            <Modal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}>
          <p>searched</p>
        </Modal>
        </div>:
        <div id="post-loc">
        <CardTitle  title="New Posts" subtitle="recent most important news about our group" />
       {this.state.list.length > 0 ?(this.state.list).map((e,i) =>  
           <PostForm handleOpen={this.handleOpen} post={e} key={i}/>):
               <Card>
                 <CardTitle>We Have no post Yet..</CardTitle>
               </Card>
               }
       {
         (this.state.currentCount !== this.state.total)?
             <CardActions id="content-end" >
                 <CircularProgress className="test2" variant="indeterminate" disableShrink style={styles.facebook} size={24} thickness={4}/>
             </CardActions>
         : null
       }
       <Modal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}>
     <p>Modal</p>
     <p>Data</p>
   </Modal>
   </div>
      
      
      } 
   <Footer/>
  </div>)
  }
};

export default HomePage;
