import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dinero from 'dinero.js'
import {me, fetchOrders, getPurchaseLineItems} from '../store'
import {withRouter} from 'react-router-dom'
import OrderDetailCard from './orderDetailCard'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    this.props.getOrders()
    this.props.getPurchaseLineItems()
  }

  render() {
    const {user, allOrders} = this.props
    return (
      <div>
        <h3>
          <strong>{`Order History for ${user.email}.`}</strong>
        </h3>
        <div>
          {allOrders.orders.length ? (
            allOrders.orders.map(order => {
              const convertedTotal = Dinero({
                amount: Number(order.subTotal),
                currency: 'USD'
              }).toFormat('$0,0.00')
              const purchasedItems = this.props.allOrders.purchasedItems.filter(
                item => item.orderId === order.id
              )
              return (
                <div className="card" id="orderCard" key={order.id}>
                  <h1 title="OrderId">OrderId: {order.id}</h1>
                  <OrderDetailCard
                    subTotal={order.subTotal}
                    items={purchasedItems}
                  />
                  <h1>Total: {`${convertedTotal}`}</h1>
                </div>
              )
            })
          ) : (
            <div>You have no orders. Sorry.</div>
          )}
        </div>
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
  getOrders: () => dispatch(fetchOrders()),
  getPurchaseLineItems: () => dispatch(getPurchaseLineItems())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
