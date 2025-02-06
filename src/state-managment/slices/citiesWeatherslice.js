import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "../../core/constants/index"


const initialState = {
  data: [],
  error: null,
  loading: false
};

export const fetchCitiesData = createAsyncThunk(
  "cities/fetchCitiesData",
  async () => {
    const response = await fetch(`${API_URL}${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cities data");
    }
    const data = await response.json();
    return data;
  }
);

const citiesWeatherSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCitiesData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload;
        } else {
          state.data = [];
        }
      })
      .addCase(fetchCitiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default citiesWeatherSlice.reducer;
