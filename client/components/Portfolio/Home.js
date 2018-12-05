import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearingInterval, requestInInterval } from '../../../utils';

import SharesTable from './SharesTable';
import BuyStocksForm from './BuyStocksForm';

import { Grid, Typography } from '@material-ui/core';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      intervalStarted: false,
    };
  }
  componentDidMount() {
    const { transactions } = this.props;
    if (transactions.length) {
      requestInInterval();
      this.setState({
        intervalStarted: true,
      });
    }
  }
  componentDidUpdate(prevProps) {
    console.log(this.state);
    if (prevProps.transactions.length && this.props.transactions.length) {
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
          {currPrices.length &&
            (transactions.reduce((acc, stock) => {
              return (
                acc +
                currPrices[stock.ticker].quote.latestPrice * stock.shares * 100
              );
            }, 0) +
              user.balance * 100) /
              100}
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
