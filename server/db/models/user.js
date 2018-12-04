const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  balance: {
    // In pennies to prevent rounding errors
    type: Sequelize.INTEGER,
    defaultValue: 500000,
    get() {
      return this.getDataValue('balance') / 100;
    },
    set(balance) {
      this.setDataValue('balance', balance * 100);
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a func hides it when serializing to JSON.
    get() {
      return () => this.getDataValue('salt');
    },
  },
});

// Instance Methods
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

// Class Methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

// Hooks
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
