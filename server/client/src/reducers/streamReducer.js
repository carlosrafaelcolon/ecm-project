import { SEARCH_STREAMS, SEARCH_STREAMS_ERROR } from '../type';

export const streamsReducer = (state = [], action) => {
  switch(action.type) {
    case SEARCH_STREAMS:
      return [...action.payload]
    default:
      return state
  }
}

export const streamsErrorReducer = (state = null, action) => {
  switch(action.type) {
    case SEARCH_STREAMS_ERROR:
      return action.payload
    default:
      return state
  }
}