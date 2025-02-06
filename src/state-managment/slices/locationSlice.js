import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCities: ["Yerevan", "Moscow", "London", "Berlin", "New York"],
  isEmpty: false,
  maxValue: true
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addCity: (state, action) => {
        if(state.selectedCities.length === 5) {
          state.maxValue = true
        }
        if(!state.maxValue) {
          if (!state.selectedCities.includes(action.payload)) {
              state.selectedCities.push(action.payload);
          }
        }
        state.isEmpty = state.selectedCities.length === 0;     
    },
    removeCity: (state, action) => {
        state.selectedCities = state.selectedCities.filter(city => city !== action.payload);
        state.maxValue = false
        state.isEmpty = state.selectedCities.length === 0;
      },
  },
});

export const { addCity, removeCity } = locationsSlice.actions;
export default locationsSlice.reducer;
