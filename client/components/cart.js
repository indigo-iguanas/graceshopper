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
    return (
      <div>
        <h1>THIS IS THE CART </h1>
        <ul>
          {this.props.order
            .filter(element => element.status === 'inCart')
            .map(element => <li>{element.emotion.name}</li>)}
        </ul>
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
