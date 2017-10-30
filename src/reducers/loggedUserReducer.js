import { GET_LOGGED_USER_RESPONSE, SET_USER_LOGIN_RESPONSE, SET_USER_LOGOUT_RESPONSE } from './loggedUserAction';

const initState = {
  logged: false
};

// reducer
const loggedUserReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LOGGED_USER_RESPONSE:
      return state;
    case SET_USER_LOGIN_RESPONSE:
    case SET_USER_LOGOUT_RESPONSE:
      return {
        ...state,
        logged: action.logged
      };
    default:
      return state;
  }
};

export default loggedUserReducer;
