const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const { db, Transaction } = require('./db');

const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const init = () => {
  // logging middleware
  app.use(volleyball);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(compression());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'All your base are belong to us',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const start = async () => {
  await sessionStore.sync();
  await db.sync({ force: false });
  await init();
  const PORT = 8080;
  app.listen(PORT, err => {
    if (err) console.error(err);
    else console.log(`http://localhost:${PORT}`);
  });
};

start();
