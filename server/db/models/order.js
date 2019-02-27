const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now
  },
  status: {
    type: Sequelize.ENUM('inCart', 'purchased'),
    defaultValue: 'inCart'
  }
})

module.exports = Order
