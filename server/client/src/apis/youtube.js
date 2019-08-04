import axios from 'axios'

const KEY = 'AIzaSyDBB3pbEsFLjLjNPM4UwOESXTDjF_L8gJY'
// npm install axios@0.18.1

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  },
  'crossDomain': true
})