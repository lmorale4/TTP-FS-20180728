import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearingInterval, requestInInterval } from '../../../utils';

import SharesTable from './SharesTable';
import BuyStocksForm from './BuyStocksForm';

import { Grid, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  grow: {
    flexGrow: 1,
    width: '100%',
  },
  spacing: {
    marginBottom: theme.spacing.unit * 5,
  },
});

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
    const { transactions, user, currPrices, classes } = this.props;
    return (
      <div className={classes.grow}>
        <Typography variant="h2" className={classes.spacing}>
          Portfolio ($
          {Object.keys(currPrices).length
            ? (
                (transactions.reduce((acc, stock) => {
                  return (
                    acc +
                    Math.round(
                      currPrices[stock.ticker].quote.latestPrice * 100
                    ) *
                      stock.shares
                  );
                }, 0) +
                  Math.round(user.balance * 100)) /
                100
              ).toFixed(2)
            : user.balance.toFixed(2)}
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

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapState)(Home));
