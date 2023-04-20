import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slice/news'
import authSlice from './slice/authSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})