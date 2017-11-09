import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggedUserReducer from '../reducers/loggedUserReducer/loggedUserReducer';
import commentReducer from '../reducers/commentReducer/commentReducer';
import { sagaRoot } from '../sagas/saga';

const reducers = combineReducers({
  loggedUserState: loggedUserReducer,
  commentState: commentReducer,
});

const saga = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(saga));
saga.run(sagaRoot);

export default store;
