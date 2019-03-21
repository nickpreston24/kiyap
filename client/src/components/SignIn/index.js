import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withFlexColumn, withFlexRow } from '../Flex';
import { withStyles } from '@material-ui/core/styles'

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

const SignInPage = ({classes}) => (
  <div className={classes.root}>
    <Typography variant='h5' color='primary' gutterBottom style={{margin: 30}}>Sign In</Typography>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const { classes } = this.props

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          fullWidth
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          variant="outlined"
        />
        <TextField
          clasName={classes.textFeld}
          margin='normal'
          fullWidth
          varian="outlined"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          variant="outlined"
        />
        <Button size='medium' color='primary' variant='contained' disabled={isInvalid} type="submit">
          Let's Go
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles),
)(SignInFormBase);

export default withFlexColumn(withFlexRow(withStyles(styles)(SignInPage)));

export { SignInForm };