import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  country: string,
  language: string
}

const initialState: CounterState = {
  country: 'Belarus',
  language: 'Uzbek'
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
  },
})

// Action creators are generated for each case reducer function
export const { setCountry , setLanguage} = counterSlice.actions

export default counterSlice.reducer