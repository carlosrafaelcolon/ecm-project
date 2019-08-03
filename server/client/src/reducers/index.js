import { combineReducers } from 'redux';
import { streamsReducer, streamsErrorReducer } from './streamReducer';
import auth from './auth'
import { searchTermReducer, selectedContentReducer, commentSearchTermReducer } from './searchTermReducer';
import { reducer as formReducer } from 'redux-form';

import { POST_CHANNELID, POST_VIDEO, FETCH_SUBJECTS, FETCH_USER_DATA } from '../type'


const channelIdReducer = (state = null, action) => {
  switch(action.type) {
    case POST_CHANNELID:
      return action.payload;
    default:
      return state
  }
}
const videoIdReducer = (state = null, action) => {
  switch(action.type) {
    case POST_VIDEO:
      return action.payload;
    default:
      return state
  }
}
const subjectsReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_SUBJECTS:
      return action.payload;
    default:
      return state
  }
}
const userReducer = (state = null, action) => {
  switch(action.type) {
    case FETCH_USER_DATA:
      return action.payload;
    default:
      return state
  }
}
export default combineReducers({
  auth,
  form: formReducer,
  searchTerm: commentSearchTermReducer,
  user: userReducer,
  subjects: subjectsReducer,
  streams: streamsReducer,
  streamsError: streamsErrorReducer,
  searchResults: searchTermReducer,
  selectedChannel: channelIdReducer,
  selectedVideo: videoIdReducer,
  selectedContent: selectedContentReducer
})