import { AUTH_USER, AUTH_ERROR } from '../type'
const INITIAL_STATE = {
  auth_token: '',
  info: {},
  error: ''
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_USER:
      return {...state, ...action.payload};
    case AUTH_ERROR:
      return {...state, ...action.payload};
    default:
      return state
  }
}