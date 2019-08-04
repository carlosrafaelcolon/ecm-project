import {yt_route} from '../apis/backend';
import youtube from '../apis/youtube';
import {
  POST_CHANNELID,
  FETCH_USER_DATA,
  FETCH_SUBJECTS,
  SEARCH_TERM_VIDS
} from '../type';

export const postChannelId = channelId => async dispatch => {
  const response = await yt_route.post('/channel', {
    channelId
  }, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
  dispatch({
    type: POST_CHANNELID,
    payload: response.data
  });
};

export const fetchSubjects = () => async dispatch => {
  const response = await yt_route.get('/subjects');
  dispatch({
    type: FETCH_SUBJECTS,
    payload: response.data
  });
};

export const fetchUserData = (authorChannelId) => async dispatch => {
  const response = await yt_route.get('/user_data', {
    params: {
      authorChannelId
    }
  });
  dispatch({
    type: FETCH_USER_DATA,
    payload: response.data
  });
};

export const searchTermSubmit = (term, type) => async dispatch => {
  const response = await youtube.get('/search', {
    params: {
      q: term,
      type: type
    }
  });
  dispatch({
    type: SEARCH_TERM_VIDS,
    payload: response.data.items
  });
};
