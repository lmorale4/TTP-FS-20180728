const router = require('express').Router();

router.param('userId', (req, res, next, userId) => {
  try {
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
});

router.use('/user/:userId/transactions', require('./transactions'));

module.exports = router;
