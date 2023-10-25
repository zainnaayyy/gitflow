import { createSlice } from "@reduxjs/toolkit";

const initialState = { wide: true };

const ScreenDimensionSlice = createSlice({
  name: "screenDimension",
  initialState,
  reducers: {
    callStartedTime: (state, action) => {
      const timeConverted = action.payload;
      state.time = timeConverted;
    },
    callDurationTime: (state, action) => {
      const timeConverted = convertDate(action.payload);
      state.time = timeConverted;
    },
  },
});

export const { callStartedTime, callDurationTime } = timeSlice.actions;
export default ScreenDimensionSlice.reducer;
