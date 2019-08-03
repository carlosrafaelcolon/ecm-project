import axios from 'axios'

const KEY = 'AIzaSyDSXoCP0W-a3U5DMz4JgUhisIYGnTNlCgw'

// npm install axios@0.18.1
export const stream_search = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
  params: {
    part: 'id',
    type: 'video',
    maxResults: 25,
    key: KEY
  }
})

export const stream_info = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos',
  params: {
    part: 'snippet, liveStreamingDetails',
    key: KEY
  }
})