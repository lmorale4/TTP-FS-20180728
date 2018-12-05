import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../store/user';

import { NavLink, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  textRight: {
    textAlign: 'right',
  },
  layout: {
    width: '100%',
    marginLeft: theme.spacing.unit * 15,
    marginRight: theme.spacing.unit * 15,
  },
  grow: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar>
          <Toolbar>
            <NavLink to="/" className={classes.layout}>
              <img className="icon" src="/img/icon.png" />
            </NavLink>
            <div className={`${classes.layout} ${classes.textRight}`}>
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
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = (dispatch, { history }) => ({
  logout: () => dispatch(logout(history)),
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapState,
      mapDispatch
    )(Navbar)
  )
);
