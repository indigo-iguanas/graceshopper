import axios from 'axios'

//Action type
const GET_EMOTIONS = 'GET_EMOTIONS'
const GET_SINGLE_EMOTIONS = 'GET_SINGLE_EMOTION'

//Action creators

const getEmotions = emotions => ({
  type: GET_EMOTIONS,
  emotions
})

const getSingleEmotion = singleEmotion => ({
  type: GET_SINGLE_EMOTIONS,
  singleEmotion
})

//Thunk
export const getEmotionFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/emotion')
      dispatch(getEmotions(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSingleEmotionFromServer = id => {
  return async dispatch => {
    try {
      //need to confirm route
      const {data} = await axios.get(`api/emotions/${id}`, {orderId})
      dispatch(getSingleEmotion(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  emotions: [],
  singleEmotion: {}
}

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMOTIONS:
      return {...state, emotions: action.emotions}
    case GET_SINGLE_EMOTIONS:
      return {...state, singleEmotion: action.singleEmotion}
    default:
      return state
  }
}

export default reducer
