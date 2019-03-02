const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
  date: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM('inCart', 'purchased'),
    allowNull: false,
    defaultValue: 'inCart'
  }
})

module.exports = LineItem
