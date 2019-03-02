import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, fetchOrders} from '../store'
import {withRouter} from 'react-router-dom'

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
        {allOrders.orders.length ? (
          allOrders.orders.map((order, i) => {
            return (
              <div>
                <h5>An Order</h5>
                <h6>{`${i}: ${order.userId}`}</h6>
              </div>
            )
          })
        ) : (
          <div>noORders</div>
        )}
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
