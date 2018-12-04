import React from 'react';
import { connect } from 'react-redux';

import SharesTable from './SharesTable';
import BuyStocksForm from './BuyStocksForm';

import { Grid, Typography } from '@material-ui/core';

const Home = ({ transactions, user }) => (
  <div>
    <Typography variant="h2">
      Portfolio ($
      {transactions
        .map(trans => trans.price * trans.shares)
        .reduce((acc, curr) => acc + curr, 0) + user.balance}
      )
    </Typography>
    <Grid container spacing={24}>
      <SharesTable />
      <BuyStocksForm />
    </Grid>
  </div>
);

const mapState = state => ({
  user: state.user,
  transactions: state.transactions.all,
});

export default connect(mapState)(Home);
