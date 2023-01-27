import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './slice/news'

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
})