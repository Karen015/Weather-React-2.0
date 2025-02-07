import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "../slices/settingsSlice";
import weatherReducer from "../slices/citiesWeatherslice"
import locationsReducer from "../slices/locationSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    options: optionsReducer,
    locations: locationsReducer
  },
});
