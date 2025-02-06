import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedList: ["Temperature", "Humidity", "Wind Speed"],
  chartType: "Line", 
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setCheckedList: (state, action) => {
      state.checkedList = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { setCheckedList, setChartType } = optionsSlice.actions;
export default optionsSlice.reducer;
