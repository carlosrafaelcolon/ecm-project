import {
  SELECTED_CONTENT,
  RESET_CONTENT,
  POST_VIDEO
} from '../type';
export {  onTermReset, updateSearchTerm } from './searchTerm';
export {
  logout,
  login,
  checkAuthStatus
}
from './auth';
export {
  postChannelId,
  fetchSubjects,
  fetchUserData,
  searchTermSubmit
}
from './youtube';
export {
  getStreams,
  fetchSubjectsAndStreams
}
from './liveStream';



export const onContentSelect = video => {
  return {
    type: SELECTED_CONTENT,
    payload: video
  };
};

export const onContentReset = () => {
  return {
    type: RESET_CONTENT
  };
};

export const onCommentVideoSelect = video => {
  return {
    type: POST_VIDEO,
    payload: video
  };
};



