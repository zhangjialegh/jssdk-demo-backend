const User = require('./user')
const Cards = require('./cards')

User.hasMany(Cards); // Will add userId to Task model
Cards.belongsTo(User); // Will also add userId to Task model

module.exports = {
  User,
  Cards
}