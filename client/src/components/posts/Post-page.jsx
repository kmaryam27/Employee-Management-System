import React from 'react';
import './Post-page.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import API from '../../utils/API';
import { Card, CardTitle, CardActions } from 'material-ui/Card';


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


// class Posts extends React.Component {
//   _isMounted = false;
//   state = {
//   total:0,
//   currentCount:3,
//   offset:3,
//   list:[],
//   news:[],
//   isFetching:false,
//   selectedId: 0,
//   open: false ,
//   postSelected: {}
//   }

//   componentDidMount() {
//     this._isMounted = true;
//     window.addEventListener('scroll', this.loadOnScroll);
//     this.loadInitialContent();
//   }

//   componentWillMount(){
//     this.props.toggleAuthenticateStatus();
//   }

//   componentWillUnmount(){
//     this._isMounted = false;
//     window.removeEventListener('scroll', this.loadOnScroll);
//   }


//   loadOnScroll = (e) =>{
//       if(this.state.currentCount === this.state.total) return;
//       const el = document.getElementById('content-end');
//       var rect = el.getBoundingClientRect();
//       let isAtEnd = (rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) 
//       if(isAtEnd){
//         if(!this.state.isFetching){

//           this.setState({isFetching:true});

//           setTimeout(() => {
//             var count = this.state.currentCount + this.state.offset;
//             if(count > this.state.total) count = this.state.total;
//             if(this.state.currentCount !== this.state.total){
//               this.setState({
//                 isFetching:false,
//                 currentCount:count,
//                 list: (this.state.news).slice(0, count)
//               })
//             }
//           }, 1000);
//         }
//       }
//     }

//       loadInitialContent(){
//         API.getPosts()
//         .then(res => {
//           if (this._isMounted){
//             let tot = res.data;
//             this.setState(prevState => ({
//                 news: prevState.news.concat(res.data),
//                 total: tot.length
//               }));
//             let ary = (this.state.news).slice(0,this.state.offset);
//             this.setState({list:ary});
//           }
//         });
//     }

//     handleOpen = (event) => {
//       event.preventDefault();
//       let postId = event.target.id;
//       const selected = this.state.news.filter(e => e._id === postId);
//       this.setState({postSelected: selected[0], open: true });
//     };
  
//     handleClose = () => {
//       this.setState({ postSelected: {},open: false });
//     };
  

//   render() {
//     return (

//         <div id="post-loc">
//              <CardTitle  title="New Posts" subtitle="recent most important news about our group" />
//             {this.state.list.length > 0 ?(this.state.list).map((e,i) =>  
//                 <PostForm handleOpen={this.handleOpen} post={e} key={i}/>):
//                     <Card>
//                       <CardTitle>We Have no post Yet..</CardTitle>
//                     </Card>
//                     }
//             {
//               (this.state.currentCount !== this.state.total)?
//                   <CardActions id="content-end" >
//                       <CircularProgress className="test2" variant="indeterminate" disableShrink style={styles.facebook} size={24} thickness={4}/>
//                   </CardActions>
//               : null
//             }
//             <Modal show={this.state.open} handleClose={this.handleClose} postSelected={this.state.postSelected}>
//           <p>Modal</p>
//           <p>Data</p>
//         </Modal>
//         </div>
//     );
//   }

// }

// export default Posts;
