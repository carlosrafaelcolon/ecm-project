import axios from 'axios';

export const user_route = axios.create({
  baseURL: '/api/v1/user',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  'crossDomain': true
})

export const yt_route = axios.create({
  baseURL: '/api/v1/youtube',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  'crossDomain': true
})