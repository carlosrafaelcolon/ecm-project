import { SEARCH_STREAMS, SEARCH_STREAMS_ERROR } from '../type';
import { fetchSubjects } from './youtube';
import { stream_search, stream_info } from '../apis/stream';
function compare(a, b) {
  if (a.snippet.liveBroadcastContent < b.snippet.liveBroadcastContent) {
    return -1;
  }
  if (a.snippet.liveBroadcastContent > b.snippet.liveBroadcastContent) {
    return 1;
  }
  return 0;
}
export const fetchSubjectsAndStreams = () => async (dispatch, getState) => {
  await dispatch(fetchSubjects());
  const channelIds = [
    ...new Set(getState().subjects.map(subject => subject._id)),
    'UCSJ4gkVC6NrvII8umztf0Ow'
  ];
  dispatch(getStreams(channelIds));
};
export const getStreams = channelIds => async dispatch => {
  let errorMessage;
  let lives;
  let upcoming;
  let streamDetails;
  let search_results = [];
  let vid_results = [];
  for (let id of channelIds) {
    try {
      lives = await stream_search.get('', {
        params: {
          channelId: id,
          eventType: 'live'
        }
      });
      upcoming = await stream_search.get('', {
        params: {
          channelId: id,
          eventType: 'upcoming'
        }
      });
      if (lives.data) {
        search_results = [...search_results, ...lives.data.items];
      }
      if (upcoming.data) {
        search_results = [...search_results, ...upcoming.data.items];
      }
    } catch (e) {
      errorMessage = e.response.data;
      dispatch({
        type: SEARCH_STREAMS_ERROR,
        payload: errorMessage
      });
    }
  }

  if (search_results.length > 0) {
    for (let liveId of search_results) {
      try {
        streamDetails = await stream_info.get('', {
          params: {
            id: liveId.id.videoId
          }
        });
        if(streamDetails.data) {
          vid_results = [...vid_results, ...streamDetails.data.items];
        }
      } catch (e) {
        errorMessage = e.response.data;
        dispatch({
          type: SEARCH_STREAMS_ERROR,
          payload: errorMessage
        });
      }
    }
  }

  dispatch({
    type: SEARCH_STREAMS,
    payload: vid_results.sort(compare)
  });
};
