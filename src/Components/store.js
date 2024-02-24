import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import formReducer from './DataPage/formSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
  },
});