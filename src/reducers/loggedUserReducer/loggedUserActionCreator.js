import { GET_LOGGED_USER, SET_USER_LOGIN, SET_USER_LOGOUT } from './loggedUserAction';

// action creator
export const getLoggedUser = () => ({
  type: GET_LOGGED_USER
});

export const login = history => ({
  type: SET_USER_LOGIN,
  payload: history
});

export const logout = history => ({
  type: SET_USER_LOGOUT,
  payload: history
});
