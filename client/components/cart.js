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
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchCartFromStore(id)
  }
  purchaseCart() {
    try {
      this.props.makePurchase(this.props.user)
      // TODO - how to show this to customer?
      console.log('CART: purchase succeeded, order id ?')
    } catch (err) {
      // TODO - how to show this to customer?
      console.log('CART: purchase failed')
    }
  }

  clickHandler(id, lineItemId) {
    this.props.deleteLineItemFromStore(id, lineItemId)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <button type="button" onClick={this.purchaseCart}>
          Purchase
        </button>
        <h1>Your cart</h1>
        <div className="catalog">
          {cart.length > 0 ? (
            cart.filter(el => el.status === 'inCart').map((el, idx) => {
              return (
                <div key={idx}>
                  <h2>{el.emotion.name}</h2>
                  <img src={el.emotion.imageUrl} />
                  <button
                    type="button"
                    onClick={() => {
                      this.clickHandler(this.props.user.id, el.id)
                    }}
                  >
                    I DON'T WANT IT!
                  </button>
                </div>
              )
            })
          ) : (
            <h1>No Orders In Your Cart Currently!</h1>
          )}
        </div>
      </div>
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
  makePurchase: id => dispatch(makePurchase(id)),
  deleteLineItemFromStore: (id, lineItemId) =>
    dispatch(deleteLineItemFromServer(id, lineItemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
