import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { getTransactions, getCurrPrices } from '../store/transactions';

import { UserForm } from './User';
import { Home, Transactions } from './Portfolio';
import Loading from './Loading';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 15,
    marginRight: theme.spacing.unit * 15,
  },
});

const Routes = ({ isLoggedIn, isFetching, classes }) => {
  return (
    <main className={classNames(classes.layout, classes.grow)}>
      {isFetching ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/signup" component={UserForm} />
          <Route exact path="/login" component={UserForm} />
          {isLoggedIn && (
            <Switch>
              <Redirect exact from="/portfolio" to="/" />
              <Route exact path="/" component={Home} />
              <Route exact path="/transactions" component={Transactions} />
            </Switch>
          )}
          <Route component={UserForm} />
        </Switch>
      )}
    </main>
  );
};

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  isFetching: state.isFetching,
  error: state.error,
});

const mapDispatch = dispatch => ({
  loadData: async () => {
    await dispatch(getCurrPrices());
    await dispatch(getTransactions());
  },
});

Routes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(Routes)
  )
);
