const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  shares: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  price: {
    // In pennies to prevent rounding errors
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('price') / 100;
    },
    set(price) {
      // convert it into pennies
      this.setDataValue('price', price * 100);
    },
  },
});

Transaction.getTickers = async userId => {
  const tickers = await Transaction.findAll({
    where: {
      userId: userId,
    },
    attributes: ['ticker'],
  });
  return tickers.map(tick => tick.ticker);
};

module.exports = Transaction;
