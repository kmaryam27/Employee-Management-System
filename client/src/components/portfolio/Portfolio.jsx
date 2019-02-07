import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ImageUploader from '../image-upload/Image-upload';
import { prototype } from 'react-transition-group/TransitionGroup';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
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
});

function PortfolioForm(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Portfolio
        </Typography>
        {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}
        <div style={{margin:'10px'}}>
            <img style={{width:'100px', height:'100px'}} 
              src={((props.uploadedImg)&&(props.uploadedImg !== ''))?
                String(window.location).includes('localhost')?
                `http://localhost:3001/post/getImage/${props.uploadedImg}`:
                `https://final-mongo.herokuapp.com/post/getImage/${props.uploadedImg}`
                :((props.user.avatar)&&(String(window.location).includes('localhost')))?
                `http://localhost:3001/post/getImage/${props.user.avatar}`:
                (props.user.avatar)?
                `https://final-mongo.herokuapp.com/post/getImage/${props.user.avatar}`: 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'
                } alt="post image"/>
                <ImageUploader handleFileUpload={props.handleFileUpload}/>
        </div>
        <form className={classes.form} action="/" onSubmit={props.onSubmit}>
          
        <FormControl margin="normal" required fullWidth>
            <TextField name="name" autoFocus 
            errorText={props.errors.name} onChange={props.onChange} value={props.userPortfolio.name} placeholder={props.user.name} 
            floatingLabelText="Name"
            />
          </FormControl>
          
          <FormControl margin="normal" required fullWidth>
            <TextField name="email" 
            errorText={props.errors.email} onChange={props.onChange} value={props.userPortfolio.email} placeholder={props.user.email} 
            floatingLabelText="Email"
            />
          </FormControl>
          
        {props.user.access === 2? <div><InputLabel htmlFor="outlined-age-native-simple">
            job Title: Employee
          </InputLabel>
          </div>:
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="outlined-age-native-simple"
          >
            job Title
          </InputLabel>
          <Select
            native
            value={props.userPortfolio.access}
            onChange={props.onChange}
            input={
              <OutlinedInput
              labelWidth={100}
                name="access"
                id="outlined-age-native-simple"
              />
            }
          >
            <option value={1}>Manager</option>
            <option value={2}>Employee</option>
          </Select>
        </FormControl>
        }
          <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
            update
          </Button>
        </form>
      </Paper>
    </main>
  );
}


PortfolioForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortfolioForm);