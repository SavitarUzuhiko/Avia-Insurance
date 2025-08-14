import { createSlice } from "@reduxjs/toolkit";

type State = {
  data: {
  first_name: string;
  last_name: string;
  birth_date: Date;
  }[]
}

const initialState : State = {
  data: []
}

export const TravelersSlice = createSlice({
  name: 'travellers',
  initialState,
  reducers: {
    addTravelers: (state, action) => {
      state.data.push(action.payload)
    }
  }
})

export const { } = TravelersSlice.actions

export default TravelersSlice.reducer