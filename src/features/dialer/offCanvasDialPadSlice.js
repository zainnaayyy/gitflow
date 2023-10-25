import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

const offCanvasDialPadSlice = createSlice({
  name: "offCanvasDial",
  initialState,
  reducers: {
    openOffCanvas(state, action) {
      console.log("canvas opened");
      state.value = true;
    },
    closeOffCanvas(state, action) {
      console.log("canvas closed");
      state.value = false;
    },
  },
});

export const { openOffCanvas, closeOffCanvas } = offCanvasDialPadSlice.actions;
export default offCanvasDialPadSlice.reducer;
