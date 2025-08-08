import { configureStore } from '@reduxjs/toolkit'
import aviaReducer from './slices/AviaSlice'

export const store = configureStore({
  reducer: {
    aviaslice: aviaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch