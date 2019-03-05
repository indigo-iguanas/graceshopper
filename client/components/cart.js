import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dinero from 'dinero.js'
import {withRouter} from 'react-router-dom'
import {
  getCartFromServer,
  makePurchase,
  me,
  deleteLineItemFromServer
} from '../store'

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
    if (this.props.isGuest) {
      alert(
        'Please sign up to purchase your cart. It is painless, really! And your cart will be waiting here for you.'
      )
    } else {
      try {
        this.props.makePurchase(this.props.user, this.props.cart.subTotal)
        // TODO - how to show this to customer?
        console.log('CART: purchase succeeded, order id ?')
      } catch (err) {
        // TODO - how to show this to customer?
        console.log('CART: purchase failed')
      }
    }
  }

  deleteBtnClickHandler(id, lineItemId) {
    this.props.deleteLineItemFromStore(id, lineItemId)
    this.props.fetchCartFromStore(id)
  }

  render() {
    const cart = this.props.cart.cart
    const cartSubtotal = Dinero({
      amount: this.props.cart.subTotal,
      currency: 'USD'
    }).toFormat('$0,0.00')
    return cart.length > 0 ? (
      <div className="tblcontainer">
        <table className="table is-hoverable is-striped">
          <thead>
            <tr>
              <th>
                <abbr title="Name">Name</abbr>
              </th>
              <th>
                <abbr title="Item Image">Item</abbr>
              </th>
              <th>
                <abbr title="Price">Price</abbr>
              </th>
              <th>
                <abbr title="Remove">Remove From Cart</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.filter(el => el.status === 'inCart').map(el => {
              const price = Dinero({
                amount: Number(el.emotion.price),
                currency: 'USD'
              }).toFormat('$0,0.00')
              return (
                <tr key={el.id}>
                  <td>{el.emotion.name}</td>
                  <td>
                    <img
                      width="100"
                      src={el.emotion.imageUrl}
                      alt={el.emotion.name}
                    />
                  </td>
                  <td>{`${price}`}</td>
                  <td>
                    <a
                      className="delete is-large is-centered"
                      onClick={() => {
                        this.deleteBtnClickHandler(this.props.user.id, el.id)
                      }}
                    >
                      delete item
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total:</td>
              <td />
              <td>{`${cartSubtotal}`}</td>
              <td>
                <button
                  className="button is-dark"
                  type="button"
                  onClick={this.purchaseCart}
                >
                  Purchase
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    ) : (
      <h1>No Orders In Your Cart Currently!</h1>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
  isRegisteredUser: !!state.user.id && !state.user.isGuest,
  isGuest: !!state.user.id && state.user.isGuest
})

const mapDispatchToProps = dispatch => ({
  fetchCartFromStore: id => dispatch(getCartFromServer(id)),
  fetchUserFromStore: () => dispatch(me()),
  makePurchase: (id, subTotal) => dispatch(makePurchase(id, subTotal)),
  deleteLineItemFromStore: (id, lineItemId) =>
    dispatch(deleteLineItemFromServer(id, lineItemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
