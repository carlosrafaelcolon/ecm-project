import axios from 'axios';
axios.defaults.withCredentials = true;
export const user_route = axios.create({
  baseURL: '/api/v1/user',
  headers: {
    'Content-Type': 'application/json'
  },
  'crossDomain': true
})

export const yt_route = axios.create({
  baseURL: '/api/v1/youtube',
  headers: {
    'Content-Type': 'application/json'
  },
  'crossDomain': true
})