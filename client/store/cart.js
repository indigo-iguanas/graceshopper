import axios from 'axios'

//Action type
const GET_CART = 'GET_CART'
const MADE_PURCHASE = 'MADE_PURCHASE'
const ADDED_TO_CART = 'ADDED_TO_CART'
const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM'

const getCart = cart => ({
  type: GET_CART,
  cart
})

const madePurchase = () => ({
  type: MADE_PURCHASE
})

const addedToCart = id => ({
  type: ADDED_TO_CART,
  id
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
      alert('Error getting cart.')
      console.log(error)
    }
  }
}

export const makePurchase = id => {
  return async dispatch => {
    try {
      const {orderId} = await axios.put(`/api/cart`, {userId: id})
      dispatch(madePurchase())
      alert(`Order complete. Order id: ${orderId}.`)
    } catch (error) {
      alert('Error. Purchase not made.')
      console.log(error)
    }
  }
}

export const addEmotionToCart = emotionId => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/cart', {emotionId})
      dispatch(addedToCart(res.data))
    } catch (error) {
      // TODO: let customer know that the error has occured
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
      // TODO: let customer know that the error has occured
      console.log(error)
    }
  }
}

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    case DELETE_LINE_ITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItemId)
    case ADDED_TO_CART:
      return [...state, action.id]
    case MADE_PURCHASE:
      return initialState
    default:
      return state
  }
}

export default cartReducer
