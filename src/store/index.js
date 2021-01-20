import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import stats from 'store/stats/index';

const reducer = combineReducers({
  stats,
});

export default configureStore({ reducer });
