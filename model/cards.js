const sequelize = require('./main')
const Sequelize = require('sequelize')
const User = require('./user')
const Cards = sequelize.define('cards', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },

  webname: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  account: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  remark: {
    type: Sequelize.STRING(200),
    allowNull: true
  },
  showTime: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = Cards;
