import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, fetchOrders} from '../store'
import {withRouter} from 'react-router-dom'
import OrderDetailCard from './orderDetailCard'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    this.props.getOrders()
  }

  render() {
    const {user, allOrders} = this.props
    console.log('orders: ', allOrders.orders)
    return (
      <div>
        <h3>{`Profile for ${user.email}.`}</h3>
        <hr />
        <h4>User Details</h4>
        <ul>
          <li>hardcoded name</li>
          <li>hardcoded email</li>
          <li>hardcoded otherStuff</li>
        </ul>
        <hr />
        <h4>Order History</h4>
        <ol>
          {allOrders.orders.length ? (
            allOrders.orders.map(order => {
              return <OrderDetailCard key={order.id} order={order} />
            })
          ) : (
            <div>You have no orders. Sorry.</div>
          )}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allOrders: state.order
})

const mapDispatchToProps = dispatch => ({
  fetchUserFromStore: () => dispatch(me()),
  getOrders: () => dispatch(fetchOrders())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
