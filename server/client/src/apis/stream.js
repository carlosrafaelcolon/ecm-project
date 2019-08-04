import axios from 'axios'

const KEY = 'AIzaSyAHqbmsKufkaFPJ2kIq7ZopX8BnTYuCtF4'

// npm install axios@0.18.1
export const stream_search = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
  params: {
    part: 'id',
    type: 'video',
    maxResults: 25,
    key: KEY
  },
  'crossDomain': true
})

export const stream_info = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos',
  params: {
    part: 'snippet, liveStreamingDetails',
    key: KEY
  },
  'crossDomain': true
})