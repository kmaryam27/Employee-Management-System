import React from 'react';
import './PersistentDrawerLeft.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ImageAvatars from '../../avatar/ImageAvatars';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PersonAdd from '@material-ui/icons/PersonAdd';
import NewsAdd from '@material-ui/icons/LibraryAdd';
import PortfolioIcon from '@material-ui/icons/Person';
import PersonPin from '@material-ui/icons/PersonPin'
import PersonEdit from '@material-ui/icons/Edit';
import SearchForm from '../../search/Search';
import API from '../../../utils/API';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PrimarySearchAppBar extends React.Component {
  _isMounted = false;
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    value: '',
    suggestions: [],
    currentFocus: 0,
    searchVal: '',
    SearchedPosts:[],
news: [],
list: [],
    total:0,
  currentCount:3,
  offset:3,
  postList:[],
  memberList: [],
  isFetching:false,
  selectedId: 0,
  open: false ,
  postSelected: {},
  test:[]
  };


  // componentDidMount() {
  //   this._isMounted = true;
  //   window.addEventListener('scroll', this.props.loadOnScroll);
  //   this.loadInitialContent();
  // }

  // componentWillUnmount(){
  //   this._isMounted = false;
    // window.removeEventListener('scroll', this.props.loadOnScroll);
  // }

  // loadOnScroll = (e) =>{
  //   if(this.state.currentCount === this.state.total) return;
  //   const el = document.getElementById('content-end');
  //   var rect = el.getBoundingClientRect();
  //   let isAtEnd = (rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) 
  //   if(isAtEnd){
  //     if(!this.state.isFetching){

  //       this.setState({isFetching:true});

  //       setTimeout(() => {
  //         var count = this.state.currentCount + this.state.offset;
  //         if(count > this.state.total) count = this.state.total;
  //         if(this.state.currentCount !== this.state.total){
  //           this.setState({
  //             isFetching:false,
  //             currentCount:count,
  //             list: (this.state.news).slice(0, count)
  //           })
  //         }
  //       }, 1000);
  //     }
  //   }
  // }

    // loadInitialContent(){
    //   const alldata = this.props.posts.concat(this.props.members);
    //       this.setState(prevState => ({
    //           postList: prevState.news.concat(this.props.posts),
    //           memberList: prevState.news.concat(this.props.members),
    //           total: (alldata.length),
    //           test: alldata,
    //           news: alldata,
    //           searchVal: this.props.searchVal
    //         }));
    //       let ary = (this.state.test).slice(0,this.state.offset);
    //       this.setState({list:ary});
    //     }


  handleOpen = (event) => {
    event.preventDefault();
    let postId = event.target.id;
    const selected = this.state.news.filter(e => e._id === postId);
    this.setState({postSelected: selected[0], open: true });
  };

  handleClose = () => {
    this.setState({ postSelected: {},open: false });
  };

  // handleChange = (event) => {
  //   if(event.target.value !== ''){
  //     const val = document.getElementById('search-private').value;
  //     const selection = this.state.news.filter(e => ((e.title.toUpperCase()).includes((val).toUpperCase()) || (e.subtitle.toUpperCase()).includes((val).toUpperCase())) || (e.context.toUpperCase()).includes((val).toUpperCase()));
  //     console.log(selection)
  //     let ary = (selection).slice(0,this.state.offset);
  //     this.setState({list:ary});
  //   this.setState({searchVal: event.target.value, test: selection, total: selection.length});
  //   }else{
  //     const selection = this.state.news;
  //     let ary = (selection).slice(0,this.state.offset);
  //     this.setState({list:ary});
  //   this.setState({searchVal: event.target.value, test: selection, total: selection.length});
  //   }
    
  // }

  // SearchOpration = (event) => {
  //   event.preventDefault();
  //   const val = document.getElementById('search-private').value;
    
  //   if(val !== ''){
  //     const selection = this.state.news.filter(e => ((e.title.toUpperCase()).includes((val).toUpperCase()) || (e.subtitle.toUpperCase()).includes((val).toUpperCase())) || (e.context.toUpperCase()).includes((val).toUpperCase()));
  //     let ary = (selection).slice(0,this.state.offset);
  //     this.setState({list:ary});
  //     this.setState({searchVal: '', test: selection, total: selection.length});
  //   }else{
  //     const selection = this.state.news;
  //     let ary = (selection).slice(0,this.state.offset);
  //     this.setState({list:ary});
  //   this.setState({searchVal: '', test: selection, total: selection.length});
  //   }
  //   document.getElementById('search-private').value = '';
    
  // }


  onChange = (event, { newValue }) => {
    console.log('onChange')
    this.setState({
      value: newValue
    });
  };

  onKeyDown = (event, { newValue }) => {
    console.log('onKeyDown')
    this.setState({
      value: newValue
    });
  };


  handleProfileMenuOpen = event => {
    console.log('3')
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    console.log('4')
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    console.log('5')
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    console.log('6')
    this.setState({ mobileMoreAnchorEl: null });
  };


  
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { value, suggestions } = this.state;
 
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      value,
      // onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };
 

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static"
         className={(this.props.open === false)?"appBar":"appBar appBarShift"}>
          <Toolbar disableGutters={!this.props.open}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.props.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            {'welcome ' + this.props.user.name}
            </Typography>

            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div> */}
              <form className="searchForm_div" id="search-form" autoComplete="off" onSubmit={this.props.SearchOpration}>
                <div>
                  <div className='search-input'>
                    <input className="validate" type='text' name='search' id='search-private' placeholder="search..." value={this.props.searchVal} onChange={this.props.handleChange}/>
                  </div>
                </div>
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
              {this.props.avatar === ''?<AccountCircle />:<ImageAvatars avatar={this.props.user.avatar}/>}
                
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div 
          className="drawerHeader"
          >
            <IconButton onClick={this.props.handleDrawerClose}>
              <ChevronLeftIcon /> 
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem button key={'dashboard'} onClick={this.props.dashboardCLick}>
                <ListItemIcon><PersonPin /></ListItemIcon>
                <ListItemText primary={'dashboard'} />
              </ListItem>
              <ListItem button key={'portfolio'} onClick={this.props.portfolioCLick}>
                <ListItemIcon><PortfolioIcon /></ListItemIcon>
                <ListItemText primary={'portfolio'} />
              </ListItem>

              <ListItem button key={'add News'} onClick={this.props.addNewsCLick}>
                <ListItemIcon><NewsAdd /></ListItemIcon>
                <ListItemText primary={'add News'} />
              </ListItem>
               
          </List>
          <Divider />
          {this.props.user.access === 1 ?
          <List>
            <ListItem button key={'Add employee'} onClick={this.props.addEmployeeCLick}>
                <ListItemIcon><PersonAdd /></ListItemIcon>
                <ListItemText primary={'add employee'} />
            </ListItem>
            {/* <ListItem button key={'Edit employee'} onClick={this.props.addEmployeeCLick}>
                <ListItemIcon><PersonEdit /></ListItemIcon>
                <ListItemText primary={'edit employee'} />
            </ListItem> */}

          </List>: null}
        </Drawer>
        
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);