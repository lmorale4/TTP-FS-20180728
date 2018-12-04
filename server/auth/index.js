const router = require('express').Router();
const { User } = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) res.json(user);
    else res.status(401).send('Wrong email and/or password');
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
      name: `${req.body.firstName} ${req.body.lastName}`,
    });
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

module.exports = router;
