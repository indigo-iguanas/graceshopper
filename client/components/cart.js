import React, {Component} from 'react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {} from '../store/order'
//Note: we want this to render in the navbar so import this into navbar component

class Cart extends Component {
  constructor() {
    super()
  }
  //change for order
  componentDidMount() {}

  render() {
    return <div>THIS IS THE CART</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
