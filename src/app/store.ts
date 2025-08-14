import { configureStore } from '@reduxjs/toolkit'
import aviaReducer from './slices/AviaSlice'
import TravelersSlice from './slices/Travellers.slice'

export const store = configureStore({
  reducer: {
    aviaslice: aviaReducer,
    travelers: TravelersSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch