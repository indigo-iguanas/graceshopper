import axios from 'axios'

//Action type
const GET_EMOTIONS = 'GET_EMOTIONS'

//Action creators

const getEmotions = emotions => ({
  type: GET_EMOTIONS,
  emotions
})

//Thunk
export const getEmotionFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/emotions')
      dispatchEvent(getEmotions(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  emotions: []
}

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMOTIONS:
      return {...state, emotions: action.emotions}
    default:
      return state
  }
}

export default reducer
