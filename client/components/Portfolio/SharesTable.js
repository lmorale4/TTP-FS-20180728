import React from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const SharesTable = ({ transactions }) => (
  <Grid item xs={8}>
    <Typography variant="h5">Your Assets</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ticker</TableCell>
          <TableCell>Shares</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions &&
          transactions.map(trans => (
            <TableRow key={trans.id}>
              <TableCell>{trans.ticker}</TableCell>
              <TableCell>{trans.shares}</TableCell>
              <TableCell>{trans.price}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Grid>
);

const mapState = state => ({
  transactions: state.transactions.all,
});

export default connect(mapState)(SharesTable);
