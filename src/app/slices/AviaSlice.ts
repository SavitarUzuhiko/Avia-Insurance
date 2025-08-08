import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  country: string;
  language: string;
  day: string;
  travelers: number[];
}

const initialState: CounterState = {
  country: 'Uzbekistan',
  language: 'GB',
  day: '0',
  travelers: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setDays: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
    },
    setTravelers: (state, action: PayloadAction<number>) => {
      state.travelers = [...state.travelers, action.payload];
    },
    deleteTravelers: (state, action: PayloadAction<number>) => {
      state.travelers.splice(action.payload, 1);
      console.log("Payload",action.payload);
      console.log("State",state.travelers);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountry, setLanguage, setDays, setTravelers , deleteTravelers} =
  counterSlice.actions;

export default counterSlice.reducer;
