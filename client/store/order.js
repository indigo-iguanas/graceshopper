import axios from 'axios'

//Action type
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_PURCHASED_LINEITEMS = 'GOT_PURCHASED_LINEITEMS'

const gotPurchasedLineItems = purchasedLineItems => ({
  type: GOT_PURCHASED_LINEITEMS,
  purchasedLineItems
})

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

export const getPurchaseLineItems = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/order/purchasedItems')
      dispatch(gotPurchasedLineItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  orders: [],
  purchasedItems: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...state, orders: action.orders}
    }
    case GOT_PURCHASED_LINEITEMS: {
      return {...state, purchasedItems: action.purchasedLineItems}
    }
    default:
      return state
  }
}

export default orderReducer
