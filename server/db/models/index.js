const User = require('./user')
const Emotion = require('./emotions')
const LineItem = require('./lineItem')
const Order = require('./order')

Order.belongsTo(User, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})
User.hasMany(Order, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})

LineItem.belongsTo(Order)
Order.hasMany(LineItem)

// TODO - userId in LineItem & Order is redundant but necessary? Rethink this.
LineItem.belongsTo(User, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})
User.hasMany(LineItem, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})

LineItem.belongsTo(Emotion, {
  foreignKey: {allowNull: false},
  onDelete: 'CASCADE'
})
Emotion.hasMany(LineItem, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})

module.exports = {
  User,
  Emotion,
  LineItem,
  Order
}
