const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
  },
  shares: {
    type: Sequelize.INTEGER,
  },
  price: {
    // In pennies to prevent rounding errors
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('price') / 100;
    },
  },
});

module.exports = Transaction;
