import { takeEvery, put, all, call } from 'redux-saga/effects';
import { GET_LOGGED_USER, SET_USER_LOGIN, SET_USER_LOGOUT,
  GET_LOGGED_USER_RESPONSE, SET_USER_LOGIN_RESPONSE, SET_USER_LOGOUT_RESPONSE } from '../reducers/loggedUserAction';
import fetchSomething from '../apis/fetchLog';

// Our worker Saga
export function* getLoggedUser() {
  yield call(fetchSomething);
  yield put({ type: GET_LOGGED_USER_RESPONSE });
}

export function* login({ payload: history }) {
  yield call(fetchSomething);
  yield put({ type: SET_USER_LOGIN_RESPONSE, logged: true });
  yield call(history.push, '/app');
}

export function* logout({ payload: history }) {
  yield call(fetchSomething);
  yield put({ type: SET_USER_LOGOUT_RESPONSE, logged: false });
  yield call(history.push, '/');
}

// Our watcher Saga
export function* getLoggedUserAsync() {
  yield takeEvery(GET_LOGGED_USER, getLoggedUser);
}

export function* loginAsync() {
  yield takeEvery(SET_USER_LOGIN, login);
}

export function* logoutAsync() {
  yield takeEvery(SET_USER_LOGOUT, logout);
}

export function* sagaRoot() {
  yield all([
    getLoggedUserAsync(),
    loginAsync(),
    logoutAsync()
  ]);
}
