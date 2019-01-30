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
import PersonEdit from '@material-ui/icons/Edit';
// import Autosuggest from 'react-autosuggest';
import API from '../../../utils/API';

const languages = [
  {name: 'o', year: 1972},
  {name: 'olm', year: 2012},
  {name: 'oojl', year: 2012},
  {name: 'jhjhjh', year: 2012},
  {name: 'aaa', year: 2012},
  {name: 'oooo', year: 2012},
  {name: 'oocc', year: 2012},
  {name: 'oxsxs', year: 2012}
]; 

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  console.log('9')
const inputValue = value.trim().toLowerCase();
const inputLength = inputValue.length;
if(inputLength === 0 ) return [];
let searchArr = [];
let result = [];
searchArr = languages.filter(lang =>
  lang.name.toLowerCase().slice(0, inputLength) === inputValue
);
if(searchArr.length > 0) searchArr = searchArr.reverse();
if(searchArr.length < 3) return searchArr;
result = searchArr.slice(0, 3);
return result;
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
<div>
  {console.log('7')}
  <strong>{suggestion.name}</strong>
</div>
  
);


const drawerWidth = 240;

const styles = theme => ({
  root: {
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






  root: {
    display: 'flex',
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
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    value: '',
    suggestions: [],

    currentFocus: 0
  };

  // componentDidMount(){
    // API.searchd(this.props.token).then(result => {////////////////////

    // })
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

 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    console.log('1')
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionSelected = (event) => {
    event.preventDefault();
    console.log('ddddddddd')
    console.log(event.key)

  };

  showSugggestions = (event) => {
    event.preventDefault();
    console.log('rrrrrrr')
    console.log(event.key)
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    console.log('2')
    this.setState({
      suggestions: []
    });
console.log('search' + this.state.value)
    API.searchd(this.props.token, this.state.value).then(result => {
      console.log('search//////////////')
      console.log(result.data.news)
      // this.setState({searchResult: result})
    })
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


  // onKeyDown = (event, { newValue }) => {
  //   console.log('onKeyDown')
  //   this.setState({
  //     value: newValue
  //   });
  // };
  
  // (event) => {
  //   event.preventDefault();
  //   if (event.key === 'Enter') {
  //      console.log('zzzzzzzzzzzzz')
  //   }
  // };

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
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {/* <div className="autocomplete" id="autoMainId">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                onSuggestionSelected={this.onSuggestionSelected}
                                onSuggestionHighlighted={this.onSuggestionHighlighted}
                                highlightFirstSuggestion={true}
                                />
                            </div> */}
              {/* <InputBase
              value={this.state.value}
              onClick={this.onChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              /> */}
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
              {this.props.avatar === ''?<AccountCircle />:<ImageAvatars avatar={this.props.avatar}/>}
                
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