import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderFromServer, me, deleteOrderFromServer} from '../store'
import {withRouter} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserFromStore()
    const id = this.props.user.id
    this.props.fetchOrderFromStore(id)
  }

  clickHandler(id, orderId) {
    this.props.deleteOrderFromStore(id, orderId)
  }

  render() {
    const order = this.props.order
    return (
      <div>
        <h1>Your cart</h1>
        {order.length > 0 ? (
          order.filter(el => el.status === 'inCart').map((el, idx) => {
            return (
              <div key={idx}>
                <h2>{el.emotion.name}</h2>
                <img src={el.emotion.imageUrl} />
                <button
                  type="button"
                  onClick={() => {
                    this.clickHandler(this.props.user.id, el.id)
                  }}
                >
                  I DON'T WANT IT!
                </button>
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
  order: state.order,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchOrderFromStore: id => dispatch(getOrderFromServer(id)),
  fetchUserFromStore: () => dispatch(me()),
  deleteOrderFromStore: (id, orderId) =>
    dispatch(deleteOrderFromServer(id, orderId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
