import { user_route } from '../apis/backend';
import { AUTH_USER, AUTH_ERROR } from '../type';

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await user_route.post('/login', formProps);
    localStorage.setItem('token', response.data.auth_token);
    localStorage.setItem('info', JSON.stringify(response.data.info));
    dispatch({
      type: AUTH_USER,
      payload: response.data
    });
    callback();
  } catch (e) {
    const errorResponse = e.response.data;
    dispatch({
      type: AUTH_ERROR,
      payload: errorResponse
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await user_route
      .post(
        '/logout',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('info');
      });

    dispatch({
      type: AUTH_USER,
      payload: {
        auth_token: '',
        info: {}
      }
    });
  } catch (e) {
    const errorResponse = e.response.data;
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    dispatch({
      type: AUTH_ERROR,
      payload: { ...errorResponse, auth_token: '', info: {} }
    });
  }
};

export const checkAuthStatus = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({
      type: AUTH_USER,
      payload: {
        auth_token: '',
        info: {}
      }
    });
  } else {
    const info = localStorage.getItem('info')
      ? JSON.parse(localStorage.getItem('info'))
      : {};
    dispatch({
      type: AUTH_USER,
      payload: { auth_token: token, info }
    });
  }
};
