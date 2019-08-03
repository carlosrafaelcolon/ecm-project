import { SEARCH_TERM_VIDS, SELECTED_CONTENT, RESET_CONTENT, RESET_SEARCH_TERM, COMMENTS_SEARCH_TERM } from '../type';

export const searchTermReducer = (state = [], action) => {
  switch(action.type) {
    case SEARCH_TERM_VIDS:
      return [...action.payload];
    case RESET_CONTENT:
      return []
    default:
      return state
  }
}

export const selectedContentReducer = (state = null, action) => {
  switch(action.type) {
    case SELECTED_CONTENT:
      return action.payload;
    case RESET_CONTENT:
      return null
    default:
      return state
  }
}

export const commentSearchTermReducer = (state = '', action) => {
  switch(action.type) {
    case COMMENTS_SEARCH_TERM:
      return action.payload;
    case RESET_SEARCH_TERM:
      return ''
    default:
      return state
  }
}