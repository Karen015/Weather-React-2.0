import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Temperature: true,
  Humidity: true,
  windSpeed: true, 
  chartType: "Line",
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    toggleOption: (state, action) => {
      const option = action.payload;
      state[option] = !state[option];
    },
    setCheckedAll: (state) => {
      const allChecked = state.Temperature && state.Humidity && state.windSpeed;
      state.Temperature = !allChecked;
      state.Humidity = !allChecked;
      state.windSpeed = !allChecked;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { toggleOption, setCheckedAll, setChartType } = optionsSlice.actions;
export default optionsSlice.reducer;

