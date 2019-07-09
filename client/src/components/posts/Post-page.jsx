import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from 'material-ui/TextField';
import Add from '@material-ui/icons/Add';
import ImageUploader from '../image-upload/Image-upload';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  postContent: {
    minHeight: 120,
  }
});

function PostForm(props) {
  const { classes } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

        <div style={{margin:'10px'}}>
            <img style={{width:'100px', height:'100px'}} 
              src={((props.uploadedImg)&&(props.uploadedImg !== ''))?
                String(window.location).includes('localhost')?
                `http://localhost:3001/post/getImage/${props.uploadedImg}`:
                `https://final-mongo.herokuapp.com/post/getImage/${props.uploadedImg}`
                :'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif'
                } alt="new post"/>
                <ImageUploader handleFileUpload={props.handleFileUpload}/>
        </div>

        {/* <ImageUploader submitFile={props.submitFile} handleFileUpload={props.handleFileUpload} file={props.file}/> */}
    
        <form className={classes.form} action="/" onSubmit={props.onSubmit}>
          
        <FormControl margin="normal" required fullWidth>
            <TextField id="title" name="title" autoComplete="title" autoFocus 
            errorText={props.errors.title} onChange={props.onChange} value={props.post.title} 
            floatingLabelText="Title"
            />
          </FormControl>
          
          <FormControl margin="normal" required fullWidth>
            <TextField id="subtitle" name="subtitle" autoComplete="subtitle" 
            errorText={props.errors.subtitle} onChange={props.onChange} value={props.post.subtitle} 
            floatingLabelText="Subtitle"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <textarea className={classes.postContent} placeholder="import content ...." name="context" id="context"
             onChange={props.onChange} value={props.post.context}  ></textarea>
          </FormControl>
          

          <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
           Add Post
          </Button>
        </form>
      </Paper>
    </main> 
  );
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default withStyles(styles)(PostForm);