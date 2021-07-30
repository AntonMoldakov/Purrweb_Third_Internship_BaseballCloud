import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import { reducer as toastrReducer } from 'react-redux-toastr';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  toastr: toastrReducer,
});

export default persistReducer(persistConfig, rootReducer);
