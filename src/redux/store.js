import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slice/news';
import categoryNewsReducer from './slice/categoryNews';
import authSlice from './slice/authSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    categoryNews: categoryNewsReducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})