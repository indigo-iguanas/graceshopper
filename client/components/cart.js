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
    const parsedPrice =
      parseFloat(this.props.cart.subTotal).toPrecision(
        this.props.cart.subTotal.toString().length - 0 || 3
      ) || this.props.cart.subTotal
    return cart.length > 0 ? (
      <div className="tblcontainer">
        <h3>{`Total: $${parsedPrice}`}</h3>
        <table className="table">
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
                  <td>{`$${el.emotion.price}`}</td>
                  <td>
                    <a
                      className="delete is-large"
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
          <button
            className="button is-dark"
            type="button"
            onClick={this.purchaseCart}
          >
            Purchase
          </button>
        </table>
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
