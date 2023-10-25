import { createSlice } from "@reduxjs/toolkit";

const initialState = { time: 0 };

const convertDate = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    callStartedTime: (state, action) => {
      const timeConverted = convertDate(action.payload);
      state.time = timeConverted;
    },
    callDurationTime: (state, action) => {
      const timeConverted = convertDate(action.payload);
      state.time = timeConverted;
    },
  },
});

export const { callStartedTime, callDurationTime } = timeSlice.actions;
export default timeSlice.reducer;
