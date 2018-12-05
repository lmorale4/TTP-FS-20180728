const router = require('express').Router();
const { Transaction, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.id && req.user.id === +req.userId) {
      const transactions = await Transaction.findAll({
        where: {
          userId: req.userId,
        },
      });
      res.json(transactions);
    } else next();
  } catch (err) {
    next(err);
  }
});

router.get('/tickers', async (req, res, next) => {
  try {
    if (req.user.id && req.user.id === +req.userId) {
      const tickers = await Transaction.getTickers(req.userId);
      res.json(tickers);
    } else next();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.user.id && req.user.id === +req.userId) {
      const user = await User.findById(req.userId);
      console.log('BALANCE', req.body.balance);
      await user.update({ balance: req.body.balance });
      const transaction = await Transaction.create({
        ...req.body,
        userId: req.userId,
      });
      res.json(transaction);
    } else next();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
