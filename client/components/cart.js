import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartFromServer,
  makePurchase,
  me,
  deleteLineItemFromServer
} from '../store'
import {withRouter} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.purchaseCart = this.purchaseCart.bind(this)
    this.deleteBtnClickHandler = this.deleteBtnClickHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchCartFromStore(id)
  }

  purchaseCart() {
    try {
      this.props.makePurchase(
        this.props.user,
        parseFloat(this.props.cart.subTotal).toPrecision(
          this.props.cart.subTotal.toString().length || 1
        )
      )
      // TODO - how to show this to customer?
      console.log('CART: purchase succeeded, order id ?')
    } catch (err) {
      // TODO - how to show this to customer?
      console.log('CART: purchase failed')
    }
  }

  deleteBtnClickHandler(id, lineItemId) {
    this.props.deleteLineItemFromStore(id, lineItemId)
    this.props.fetchCartFromStore(id)
  }

  render() {
    const cart = this.props.cart.cart
    const parsedPrice = parseFloat(this.props.cart.subTotal).toPrecision(
      this.props.cart.subTotal.toString().length - 1 || 1
    )
    return cart.length > 0 ? (
      <div>
        <h3>{`Total: $${parsedPrice}`}</h3>
        <button type="button" onClick={this.purchaseCart}>
          Purchase
        </button>
        <div className="catalog">
          {cart.filter(el => el.status === 'inCart').map(el => {
            return (
              <div key={el.id}>
                <h2>{el.emotion.name}</h2>
                <h4>{`$${el.emotion.price}`}</h4>
                <img
                  width="100"
                  src={el.emotion.imageUrl}
                  alt={el.emotion.name}
                />
                <br />
                <button
                  type="button"
                  onClick={() => {
                    this.deleteBtnClickHandler(this.props.user.id, el.id)
                  }}
                >
                  I DON'T WANT IT!
                </button>
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <h1>No Orders In Your Cart Currently!</h1>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchCartFromStore: id => dispatch(getCartFromServer(id)),
  fetchUserFromStore: () => dispatch(me()),
  makePurchase: (id, subTotal) => dispatch(makePurchase(id, subTotal)),
  deleteLineItemFromStore: (id, lineItemId) =>
    dispatch(deleteLineItemFromServer(id, lineItemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
