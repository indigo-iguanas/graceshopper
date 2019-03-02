import axios from 'axios'

//Action type
const GOT_ORDERS = 'GOT_ORDERS'

const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/order`)
      const action = gotOrders(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  orders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...state, orders: action.orders}
    }
    default:
      return state
  }
}

export default orderReducer
