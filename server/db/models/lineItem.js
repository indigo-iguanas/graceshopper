const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now
  },
  status: {
    type: Sequelize.ENUM('inCart', 'purchased'),
    defaultValue: 'inCart'
  }
})

module.exports = LineItem
