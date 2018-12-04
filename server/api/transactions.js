const router = require('express').Router();
const { Transaction, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const balance = user.balance - req.body.price * req.body.shares;
    await user.update({ balance });
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.userId,
    });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
