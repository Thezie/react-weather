import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clouds: undefined,
  name: undefined,
  main: {
    feels_like: undefined,
  },
  sys: {
    country: undefined,
  },
  weather: undefined,
  wind: {
    speed: undefined,
  },
  isLoaded: false,
};
export const WeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setData: (state, action) => {
      const { clouds, main, name, sys, weather, wind } = action.payload;
      state.clouds = clouds;
      state.main = main;
      state.name = name;
      state.sys = sys;
      state.wind = wind;
      state.weather = weather[0];
      state.isLoaded = true;
    },
    resetData: (state) => {
      state.isLoaded = false;
    },
  },
});
export const { setData, resetData } = WeatherSlice.actions;
export default WeatherSlice.reducer;
