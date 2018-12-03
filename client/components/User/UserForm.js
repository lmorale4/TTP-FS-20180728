import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store/user';

import SignUp from './SignUpForm';
import Login from './LoginForm';

import { Link } from 'react-router-dom';

import { Button, Card, CardActions, CardContent } from '@material-ui/core';

class SignUpFrom extends Component {
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
    console.log(this.state);
    this.props.auth(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  }

  render() {
    const { match } = this.props;
    const isLogin = match.path === '/login';
    const buttonText = isLogin ? 'Login' : 'Sign Up';
    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardContent>
            {isLogin ? (
              <Login handleChange={this.handleChange} {...this.state} />
            ) : (
              <SignUp handleChange={this.handleChange} {...this.state} />
            )}
          </CardContent>
          <CardActions>
            <Button type="submit" color="secondary">
              {buttonText}
            </Button>
            <Link to={isLogin ? '/signup' : '/login'}>
              <Button type="button" color="secondary">
                {isLogin ? 'Sign Up' : 'Login'}
              </Button>
            </Link>
          </CardActions>
        </Card>
      </form>
    );
  }
}

const mapDispatch = (dispatch, { history, match }) => ({
  auth: user =>
    dispatch(auth(user, history, match.path === '/login' ? 'login' : 'signup')),
});

export default connect(
  null,
  mapDispatch
)(SignUpFrom);
