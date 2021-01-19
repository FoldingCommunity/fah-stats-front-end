import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import stats from 'store/stats';

const reducer = combineReducers({
  stats,
});
const store = configureStore({
  reducer,
});

export default store;
