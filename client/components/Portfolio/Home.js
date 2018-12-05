import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearingInterval, requestInInterval } from '../../../utils';

import SharesTable from './SharesTable';
import BuyStocksForm from './BuyStocksForm';

import { Grid, Typography } from '@material-ui/core';

class Home extends Component {
  componentDidMount() {
    const { transactions } = this.props;
    if (transactions.length) {
      clearingInterval();
      requestInInterval();
    }
  }
  componentWillUnmount() {
    clearingInterval();
  }
  render() {
    const { transactions, user, currPrices } = this.props;
    return (
      <div>
        <Typography variant="h2">
          Portfolio ($
          {Object.keys(currPrices).length
            ? (transactions.reduce((acc, stock) => {
                return (
                  acc +
                  Math.round(currPrices[stock.ticker].quote.latestPrice * 100) *
                    stock.shares
                );
              }, 0) +
                Math.round(user.balance * 100)) /
              100
            : user.balance}
          )
        </Typography>
        <Grid container spacing={24}>
          <SharesTable />
          <BuyStocksForm />
        </Grid>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  transactions: state.transactions.all,
  currPrices: state.transactions.currPrices,
});

export default connect(mapState)(Home);
