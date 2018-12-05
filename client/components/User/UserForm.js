import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store/user';

import SignUp from './SignUpFields';

import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  background: {
    backgroundColor: theme.palette.primary.light,
    marginTop: '10px',
  },
  center: {
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  color: {
    color: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.status.bad,
    padding: '5px',
  },
  grow: {
    flexGrow: 1,
  },
  topSpace: {
    marginTop: '10px',
  },
});

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.auth(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  }

  render() {
    const { match, classes, error } = this.props;
    const { email, password } = this.state;
    const isLogin = match.path === '/login';
    const isError = error.status === 401;
    const buttonText = isLogin ? 'Login' : 'Sign Up';
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography variant="h4" className={classes.centerText}>
          {buttonText}
        </Typography>
        <Card className={classes.topSpace}>
          <CardContent>
            {!isLogin && (
              <SignUp handleChange={this.handleChange} {...this.state} />
            )}
            <TextField
              required
              label="Email"
              name="email"
              value={email}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              value={password}
              fullWidth
              onChange={this.handleChange}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" color="secondary">
              {buttonText}
            </Button>
            {isError && (
              <div className={classNames(classes.error, classes.grow)}>
                <Typography error="true">{error.data}</Typography>
              </div>
            )}
          </CardActions>
        </Card>
        <Card className={classes.background}>
          <CardActions className={classes.center}>
            {!isLogin ? (
              <Link to="/login" className={classes.color}>
                Already have an account? <strong>Login</strong>
              </Link>
            ) : (
              <Link to="/signup" className={classes.color}>
                Don't have an account? <strong>Sign Up</strong>
              </Link>
            )}
          </CardActions>
        </Card>
      </form>
    );
  }
}
const mapState = state => ({
  error: state.error,
});

const mapDispatch = (dispatch, { history, match }) => ({
  auth: user =>
    dispatch(auth(user, history, match.path === '/login' ? 'login' : 'signup')),
});

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(UserForm)
);
