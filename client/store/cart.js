import axios from 'axios'

//Action type
const GET_CART = 'GET_CART'
const MADE_PURCHASE = 'MADE_PURCHASE'
const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM'

const getCart = cart => ({
  type: GET_CART,
  cart
})

const madePurchase = () => ({
  type: MADE_PURCHASE
})

const deleteLineItem = lineItemId => ({
  type: DELETE_LINE_ITEM,
  lineItemId
})

export const getCartFromServer = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      dispatch(getCart(data))
    } catch (error) {
      // TODO - how to show error to customer?
      console.log(error)
    }
  }
}

export const makePurchase = id => {
  return async dispatch => {
    try {
      // TODO - do something with orderId?
      const {_orderId} = await axios.put(`/api/cart`, {userId: id})
      dispatch(madePurchase())
    } catch (error) {
      // TODO - how to show error to customer?
      console.log(error)
    }
  }
}

export const deleteLineItemFromServer = (id, lineItemId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${id}/${lineItemId}`)
      dispatch(deleteLineItem(lineItemId))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return [...initialState, ...action.cart]
    case DELETE_LINE_ITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItemId)
    case MADE_PURCHASE:
      return initialState
    default:
      return state
  }
}

export default cartReducer
