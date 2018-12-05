import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeUser } from '../store/user';

import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

class Navbar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <NavLink to="/">
            <Button color="secondary">Portfolio</Button>
          </NavLink>
          <NavLink to="/transactions">
            <Button color="secondary">Transactions</Button>
          </NavLink>
          {user.id && (
            <Button color="secondary" onClick={this.handleClick}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(removeUser()),
});

export default connect(
  mapState,
  mapDispatch
)(Navbar);
