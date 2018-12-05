import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { getTransactions, getCurrPrices } from '../store/transactions';

import { UserForm } from './User';
import { Home, Transactions } from './Portfolio';
import Loading from './Loading';

// load transactions here after user has loaded
// Maybe use shouldComponentUpdate for checking if the user is set
class Routes extends Component {
  componentDidMount() {
    // this.props.loadData();
  }

  render() {
    const { isLoggedIn, isFetching } = this.props;
    return (
      <main>
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
  }
}

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

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
