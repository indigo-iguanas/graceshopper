import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderFromServer, me} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchOrderFromStore(id)
  }

  render() {
    const order = this.props.order
    return (
      <div>
        <h1>THIS IS THE CART </h1>
        {order.length > 0 ? (
          order.map((el, idx) => <li key={idx}>hello?</li>)
        ) : (
          <h1>No Orders In Your Cart Currently!</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchOrderFromStore: id => dispatch(getOrderFromServer(id)),
  fetchUserFromStore: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
