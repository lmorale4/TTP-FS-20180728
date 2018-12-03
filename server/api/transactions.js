const router = require('express').Router();
const { Transaction } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
