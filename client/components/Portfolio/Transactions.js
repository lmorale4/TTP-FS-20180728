import React from 'react';
import { connect } from 'react-redux';

import ShareTable from './SharesTable';

const Transactions = ({ transactions }) => (
  <ShareTable transactions={transactions} />
);

const mapState = state => ({
  transactions: state.transactions.all,
});

export default connect(mapState)(Transactions);
