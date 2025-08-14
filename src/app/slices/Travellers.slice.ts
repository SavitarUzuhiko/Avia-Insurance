import { createSlice } from "@reduxjs/toolkit";

type State = {
  data: {
  firstName: string;
  lastName: string;
  birthDate: Date | string;
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
      state.data.push(...action.payload)
    }
  }
})

export const { addTravelers } = TravelersSlice.actions

export default TravelersSlice.reducer