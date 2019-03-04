const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  subTotal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Order
