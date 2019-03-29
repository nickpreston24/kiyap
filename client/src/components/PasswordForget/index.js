import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, TextField, Typography } from '@material-ui/core';
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

const PasswordForgetPage = withStyles(styles)(({classes}) => (
  <div className={classes.root}>
    <Typography variant='h5' color='primary' gutterBottom style={{margin: 30}}>Reset Password</Typography>
    <PasswordForgetForm />
  </div>)
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="email"
          variant='outlined'
          fullWidth
          // margin='normal'
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} color='primary' variant='contained' type="submit" style={{marginTop: 20}}>
          Send Link
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };