import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromServer, makePurchase, me} from '../store'
import {withRouter} from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.purchaseCart = this.purchaseCart.bind(this)
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

  render() {
    const {user} = this.props
    return (
      <div>
        <h3>{`Profile for ${user.email}.`}</h3>
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
  makePurchase: id => dispatch(makePurchase(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
