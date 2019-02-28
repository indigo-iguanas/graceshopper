import axios from 'axios'

//Action type
const GET_ORDER = 'GET_ORDER'

const getOrder = order => ({
  type: GET_ORDER,
  order
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

const initialState = []

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return [...initialState, action.order]
    default:
      return state
  }
}

export default orderReducer
