import axios from 'axios'

//Action type
const GET_ORDER = 'GET_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

const getOrder = order => ({
  type: GET_ORDER,
  order
})

const deleteOrder = orderId => ({
  type: DELETE_ORDER,
  orderId
})

//Thunk
export const getOrderFromServer = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      dispatch(getOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteOrderFromServer = (id, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${id}/${orderId}`)
      console.log('this is data', data)
      dispatch(deleteOrder(orderId))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return [...state, ...action.order]
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.orderId)
    default:
      return state
  }
}

export default orderReducer
