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
    const { user, tickers, price } = this.props;
    const { ticker, shares } = this.state;
    return (
      <Grid item xs={4}>
        <Typography variant="h5">Cash: ${user.balance}</Typography>
        <form onSubmit={this.handleSubmit}>
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
          <Button type="submit" color="secondary">
            Buy
          </Button>
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

export default connect(
  mapState,
  mapDispatch
)(BuyStocksForm);
