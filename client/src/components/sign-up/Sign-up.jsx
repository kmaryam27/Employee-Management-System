import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ImageUploader from '../image-upload/Image-upload';

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

function SignUpForm(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

        <ImageUploader submitFile={props.submitFile} handleFileUpload={props.handleFileUpload} file={props.file}/>

        <form className={classes.form} action="/" onSubmit={props.onSubmit}>
          
        <FormControl margin="normal" required fullWidth>
            <TextField id="name" name="name" autoComplete="name" autoFocus 
            errorText={props.errors.name} onChange={props.onChange} value={props.user.name} 
            floatingLabelText="Name"
            />
          </FormControl>
          
          <FormControl margin="normal" required fullWidth>
            <TextField id="email" name="email" autoComplete="email" 
            errorText={props.errors.email} onChange={props.onChange} value={props.user.email} 
            floatingLabelText="Email"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField name="password" type="password" id="password" autoComplete="current-password" 
             onChange={props.onChange} errorText={props.errors.password} value={props.user.password} 
             floatingLabelText="Password"
             />
          </FormControl>
          

          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="outlined-age-native-simple"
          >
            job Title
          </InputLabel>
          <Select
            native
            value={props.access}
            onChange={props.onChange}
            input={
              <OutlinedInput
              labelWidth={100}
                name="access"
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value={1}>Manager</option>
            <option value={2}>Employee</option>
          </Select>
        </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign in
          </Button>
          <CardText>This part is just for Managers</CardText>
        </form>
      </Paper>
    </main>
  );
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUpForm);