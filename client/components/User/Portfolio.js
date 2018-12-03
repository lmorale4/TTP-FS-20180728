import React from 'react';
import { connect } from 'react-redux';

const Portfolio = props => (
  <div>
    <h1>Portfolio</h1>
    <div>Balance: ${props.user.balance}</div>
  </div>
);

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(Portfolio);
