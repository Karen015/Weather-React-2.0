import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../../core/constants/index";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const fetchCitiesData = createAsyncThunk(
  "cities/fetchCitiesData",
  async (cities, { rejectWithValue }) => {
    try {
      const requests = cities.map((city) =>
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`).then((resp) => {
          if (!resp.ok) throw new Error(`Ошибка: ${city} не найден`);
          return resp.json();
        })
      );

      const results = await Promise.all(requests);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.error = null;
      })
      .addCase(fetchCitiesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchCitiesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default citiesWeatherSlice.reducer;
