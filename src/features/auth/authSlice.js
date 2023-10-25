import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, access, id, user_type, user_role } = action.payload;

      state.user = username;
      state.token = access;
      state.id = id;
      state.user_type = user_type;
      state.user_role = user_role;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user; // exported to display current user in page
export const selectCurrentId = (state) => state.auth.id;
export const selectCurrentToken = (state) => state.auth.token;
