import axios from 'axios'

const initialState = []

//Action type
const GET_CART = 'GET_CART'
const MADE_PURCHASE = 'MADE_PURCHASE'
const ADDED_TO_CART = 'ADDED_TO_CART'

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
      // TODO: letting customer know that the error has occured
      console.log(error)
    }
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return [...action.cart]
    case ADDED_TO_CART:
      return [...state, action.id]
    case MADE_PURCHASE:
      return initialState
    default:
      return state
  }
}

export default cartReducer
