import axios from 'axios'

//Action type
const GET_CART = 'GET_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

//Thunk
export const getCartFromServer = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      dispatch(getCart(data))
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
    default:
      return state
  }
}

export default cartReducer
