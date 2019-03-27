import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Button, Typography, TextField, withStyles} from '@material-ui/core'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withFlexColumn, withFlexRow} from '../Flex';
import * as ROLES from '../../constants/roles';

const styles = theme => ({
  root: {
    maxWidth: 300,
    boxSizing: 'border-box',
    padding: '0px 20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContents: 'flex-start',
    alignItems: 'center',
    color: `${theme.palette.text.primary}`,
    '& a': {
      textDecoration: 'none',
    },
    '& a:hover, a:visited': {
      color: `${theme.palette.primary.main}`,
    },
  },
})

const SignUpPage = withStyles(styles)(({classes}) => (
  <div className={classes.root}>
    <Typography variant='h5' color='primary' gutterBottom style={{margin: 30}}>Sign Up</Typography>
    <SignUpForm/>
  </div>)
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if(isAdmin){
        roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser=>{
        //Creates a user in the Firebase Realtime database:
        return this.props.firebase
            .user(authUser.user.id)
            .set({
                username,
                email,
                roles
            });
      })
      .then(_ => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME) //To User's Home page/dash
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onCheckboxChange = event => {
      this.setState({ [event.target.name]: event.target.checked });
  }

  onChange = event => {
    // let {name, value} = event.target;
    // this.setState({ [name]: value });
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        isAdmin,
        error,
      } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
         <TextField
         fullWidth
         margin='dense'
         variant='outlined'
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          label="Full Name"
        />
        <TextField
         fullWidth
         margin='dense'
         variant='outlined'
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          label="Email Address"
        />
        <TextField
         fullWidth
         margin='dense'
         variant='outlined'
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          label="Password"
        />
        <TextField
         fullWidth
         margin='dense'
         variant='outlined'
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
        />
        <label>
            Admin:
            <input
                name='isAdmin'
                type='checkbox'
                checked={isAdmin}
                onChange={this.onCheckboxChange}
            />
        </label>
        <Button disabled={isInvalid} color='primary' variant='contained' type="submit">Sign Up</Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

  export default withFlexRow(SignUpPage);

  export { SignUpForm, SignUpLink };