import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { asteriskSlice } from "./api/asteriskSlice";
import authReducer from "../features/auth/authSlice";
import dialerSlice from "../features/dialer/dialerSlice";
import timeSlice from "../features/dialer/timeSlice";
import offCanvasDialPadSlice from "../features/dialer/offCanvasDialPadSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [asteriskSlice.reducerPath]: asteriskSlice.reducer,
    auth: authReducer,
    dialer: dialerSlice,
    time: timeSlice,
    offCanvasDial: offCanvasDialPadSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(asteriskSlice.middleware)
      .concat(apiSlice.middleware),
  devTools: true,
});
