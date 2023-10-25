import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueRegisteredStatus: false,
  valueInCallStatus: false,
};

const dialerSlice = createSlice({
  name: "dialer",
  initialState,
  reducers: {
    registeredStatus(state, action) {
      state.valueRegisteredStatus = action.payload;
      // console.log("registeredStatus state:::", state.valueRegisteredStatus);
      // console.log("registeredStatus payload:::", action.payload);
    },
    inCallStatus(state, action) {
      state.valueInCallStatus = action.payload;
      // console.log("inCallStatus state:::", state.valueInCallStatus);
      // console.log("inCallStatus payload:::", action.payload);
    },
    OpenScriptToogleOffCanvas(state, action) {
      // state.value = true;
      // console.log("reducer Open", state.value);
    },
  },
});

export const { registeredStatus, inCallStatus, OpenScriptToogleOffCanvas } =
  dialerSlice.actions;

export default dialerSlice.reducer;
