import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./actions";

export const store = configureStore({
    reducer: {
        appState: AppState,
    }
});
