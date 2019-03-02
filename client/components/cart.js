import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromServer, me} from '../store'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.purchaseCart = this.purchaseCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchCartFromStore(id)
  }

  async purchaseCart() {
    try {
      const orderId = await axios.put('/api/cart', {userId: this.props.user})
      // TODO - how to show this to customer?
      console.log('CART: purchase succeeded, order id:', orderId)
    } catch (err) {
      // TODO - how to show this to customer?
      console.log('CART: purchase failed')
    }
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <button type="button" onClick={this.purchaseCart}>
          Purchase
        </button>
        <div className="catalog">
          {cart.length > 0 ? (
            cart.filter(el => el.status === 'inCart').map(el => {
              return (
                <div key={el.id}>
                  <h2>{el.emotion.name}</h2>
                  <img
                    width="100"
                    src={el.emotion.imageUrl}
                    alt={el.emotion.name}
                  />
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
  fetchUserFromStore: () => dispatch(me())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
