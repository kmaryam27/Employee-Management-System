import React,{Component} from 'react';
import '../components/home-page/Home-page.css';
import '../components/posts/Post-page.css';
import { Card, CardText   , CardTitle, CardActions} from 'material-ui/Card';
import Auth from '../utils/Auth';
import API from '../utils/API';
import Logo from '../components/logo/Logo';
import SearchForm from '../components/search/Search';
import Slider from '../components/slider/Slider';
import Footer from '../components/footer/Footer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';



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
 * @description Homepage Modal for show post details
 * @param {*} props 
 */
const HomeModal = props => {
  return (
    <div className={props.show === true? "modal display-block" : "modal display-none"} style={{zIndex: "10000"}}>
      <section className="modal-main">
        <h4>{props.postSelected.title}</h4>
        <p><strong>{props.postSelected.subtitle}</strong></p>
        <div>
          <img style={{width:'200px', height:'200px'}} 
              src={((props.uploadedImg)&&(props.uploadedImg !== ''))?
              String(window.location).includes('localhost')?
                `http://localhost:3001/post/getImage/${props.postSelected.imageAddress}`:
                `https://final-mongo.herokuapp.com/post/getImage/${props.postSelected.imageAddress}`:
                props.postSelected.imageAddress?
              String(window.location).includes('localhost')?
                `http://localhost:3001/post/getImage/${props.postSelected.imageAddress}`:
                `https://final-mongo.herokuapp.com/post/getImage/${props.postSelected.imageAddress}`:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDXm4KO9UivJ8YLE7THqigiC8DVut1N2gFjp-H-xBlU2HVXIR'
                } alt="post image"/>
        </div>
        
        <span className="modal-body">
          <p>
          {props.postSelected.context}
          </p>
        </span>
        <Button onClick={props.handleClose} variant="contained" color="secondary">close</Button>
      </section>
    </div>
  );
};

/**
 * @description post Form for show up posts
 * @param {*} props 
 */
const PostForm = props => (
  <div className="news-container" data-news={props.post._id}>
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
              <button className="btn-post" id={props.post._id}  onClick={props.handleOpen}>read more</button>
        </div>
    </div>  
  </div>
);

/**
 * @description homePage:
 */
class HomePage extends Component {
  _isMounted = false;

  state={
    searchVal: '',//search var
    news:[],//get all post
    total:0,//lazy loading
    test:[],
    currentCount:3,
    offset:3,
    list:[],
    isFetching:false,
    selectedId: 0,//selected post to show with modal
    open: false ,
    postSelected: {}
  }


  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', this.loadOnScroll);
    this.homeLoadInitialContent();
  }

  /**
   * @description get all post and divide them 3 post 3 post for lazy loading
   * @description use _isMounted just for set state one time that page load
   */
  homeLoadInitialContent(){
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

  /**
   * @description update authenticated state on logout
   */
  componentWillMount() {
   this.props.toggleAuthenticateStatus();
  }

  /**
   * @description remove scroll option for lazy loading 
   */
  componentWillUnmount(){
    this._isMounted = false;
    window.removeEventListener('scroll', this.loadOnScroll);
  }

  /**
   * @description put post on lazy loading and use timer
   */
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
              list: (this.state.test).slice(0, count)
            })
          }
        }, 1000);
      }
    }
  }



/**
 * @description open modal to show post
 */
  handleOpen = (event) => {
    event.preventDefault();
    let postId = event.target.id;
    const selected = this.state.news.filter(e => e._id === postId);
    this.setState({postSelected: selected[0], open: true });
  };

  /**
   * @description close moda 
   */
  handleClose = () => {
    this.setState({ postSelected: {},open: false });
  };

  /**
   * @description onchange method for search posts
   */
  handleChange = (event) => {
    if(event.target.value !== ''){
      const val = document.getElementById('search').value;
      const selection = this.state.news.filter(e => ((e.title.toUpperCase()).includes((val).toUpperCase()) || (e.subtitle.toUpperCase()).includes((val).toUpperCase())) || (e.context.toUpperCase()).includes((val).toUpperCase()));
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

  /**
   * @description onSubmit Methos for search
   */
  SearchOpration = (event) => {
    event.preventDefault();
    const val = document.getElementById('search').value;
    

    if(val !== ''){
      const selection = this.state.news.filter(e => ((e.title.toUpperCase()).includes((val).toUpperCase()) || (e.subtitle.toUpperCase()).includes((val).toUpperCase())) || (e.context.toUpperCase()).includes((val).toUpperCase()));
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
      this.setState({searchVal: '', test: selection, total: selection.length});
    }else{
      const selection = this.state.news;
      let ary = (selection).slice(0,this.state.offset);
      this.setState({list:ary});
    this.setState({searchVal: '', test: selection, total: selection.length});
    }
    document.getElementById('search').value = '';
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
        <div className="post-loc">
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
                </CardActions>: null
            }
            <HomeModal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}/>
        </div>:
        <div className="post-loc">
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
              </CardActions>: null
          }
          <HomeModal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}/>
        </div>
      } 
      <Footer/>
    </div>)
  }
};

export default HomePage;
