import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPrice, removeCurrTickerPrice } from '../../store/tickers';
import { buyStock } from '../../store/transactions';

import {
  Button,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  spacing: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
});

class BuyStocksForm extends Component {
  constructor() {
    super();
    this.state = {
      ticker: '',
      shares: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    if (evt.target.name === 'ticker') {
      this.props.getPrice(evt.target.value);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { user, price } = this.props;
    const { shares } = this.state;
    if (user.balance > +price * +shares) {
      console.log({ ...this.state, price });
      this.props.buyStock({
        ...this.state,
        price: +price,
      });
    }
    this.props.removePrice();
    this.setState({
      ticker: '',
      shares: 0,
    });
  }

  render() {
    const { user, tickers, price, classes } = this.props;
    const { ticker, shares } = this.state;
    return (
      <Grid item xs={4}>
        <Typography variant="h5">Cash: ${user.balance.toFixed(2)}</Typography>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.spacing}>
            <InputLabel htmlFor="ticker">Ticker</InputLabel>
            <Select
              native
              value={ticker}
              onChange={this.handleChange}
              name="ticker"
              id="ticker"
              fullWidth
            >
              <option value="" />
              {tickers.map(tick => (
                <option key={tick} value={tick}>
                  {tick}
                </option>
              ))}
            </Select>
            {price > 0 && <p>Price per Share: {price}</p>}
            <TextField
              label="Qty"
              name="shares"
              onChange={this.handleChange}
              value={shares}
              fullWidth
            />
          </div>
          <div className={classes.spacing}>
            <Button type="submit" color="secondary">
              Buy
            </Button>
          </div>
        </form>
      </Grid>
    );
  }
}

const mapState = state => ({
  user: state.user,
  tickers: state.tickers.all,
  price: Math.round(state.tickers.currentTickerPrice * 100) / 100,
});

const mapDispatch = dispatch => ({
  getPrice: ticker => dispatch(getPrice(ticker)),
  buyStock: stock => dispatch(buyStock(stock)),
  removePrice: stock => dispatch(removeCurrTickerPrice(stock)),
});

BuyStocksForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(BuyStocksForm)
);
