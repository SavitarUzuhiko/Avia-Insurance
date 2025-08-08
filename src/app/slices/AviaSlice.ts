import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  country: string,
  language: string,
  day: string
}

const initialState: CounterState = {
  country: 'Belarus',
  language: 'UZ',
  day: '0'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      console.log(state.language);
    },
    setDays: (state, action: PayloadAction<string>) => {
      console.log(state.day);
      state.day = action.payload;
      console.log(state.day);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCountry , setLanguage, setDays} = counterSlice.actions

export default counterSlice.reducer