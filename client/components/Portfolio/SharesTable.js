import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clearingInterval, requestInInterval } from '../../../utils';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  good: {
    backgroundColor: theme.palette.status.good,
  },
  ok: {
    backgroundColor: theme.palette.status.ok,
  },
  bad: {
    backgroundColor: theme.palette.status.bad,
  },
});

class SharesTable extends Component {
  constructor() {
    super();
    this.setColor = this.setColor.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.transactions.length !== prevProps.transactions.length) {
      clearingInterval();
      requestInInterval();
    }
  }

  setColor(price, stockPrice) {
    if (stockPrice === price) return 'ok';
    else if (stockPrice > price) return 'good';
    else return 'bad';
  }
  render() {
    const { classes, currPrices, match, transactions } = this.props;
    const isPortfolio = match.path !== '/transactions';
    return (
      <Grid item xs={8}>
        <Typography variant="h5">Your Assets</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Shares</TableCell>
              <TableCell>{isPortfolio ? 'Current Price' : 'Price'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.map(stock => (
                <TableRow
                  key={stock.id}
                  className={
                    isPortfolio
                      ? classes[
                          this.setColor(
                            stock.price,
                            Math.round(
                              currPrices[stock.ticker].quote.open * 100
                            ) / 100
                          )
                        ]
                      : ''
                  }
                >
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell>{stock.shares}</TableCell>
                  <TableCell>
                    {isPortfolio
                      ? (Math.round(
                          currPrices[stock.ticker].quote.latestPrice * 100
                        ) /
                          100) *
                        stock.shares
                      : stock.price}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

const mapState = state => ({
  transactions: state.transactions.all,
  currPrices: state.transactions.currPrices,
});

SharesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect(mapState)(SharesTable)));
