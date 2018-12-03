const User = require('./user');
const Transaction = require('./transaction');

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = { User, Transaction };
