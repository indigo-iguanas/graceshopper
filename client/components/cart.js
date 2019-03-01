import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromServer, me} from '../store'
import {withRouter} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchCartFromStore(id)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h1>THIS IS THE CART </h1>
        {cart.length > 0 ? (
          cart.filter(el => el.status === 'inCart').map((el, idx) => {
            return (
              <div key={el.id}>
                <h2>{el.emotion.name}</h2>
                <img src={el.emotion.imageUrl} />
              </div>
            )
          })
        ) : (
          <h1>No Orders In Your Cart Currently!</h1>
        )}
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
