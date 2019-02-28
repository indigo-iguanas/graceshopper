import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderFromServer, me} from '../store'
import {withRouter} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.fetchUserFromStore()
    const id = this.props.user.id
    await this.props.fetchOrderFromStore(id)
  }

  render() {
    const order = this.props.order
    console.log(order, 'this is the order')

    return (
      <div>
        <h1>THIS IS THE CART </h1>
        {order.length > 0 ? (
          order.filter(el => el.status === 'inCart').map((el, idx) => {
            return <li key={idx}>{el.emotionId}</li>
          })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
