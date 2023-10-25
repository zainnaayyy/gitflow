import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8000", // Local Backend [LOCAL](Ivan Local)
  // baseUrl: "https://devback.iqbot.live", // Development Backend [AWS SERVER] (Other Developers)
  baseUrl: "https://back.iqbot.live", // Production Backend [OFFICE SERVER]
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log("JUST AFTER baseeQueryWithReauth");

  let result = await baseQuery(args, api, extraOptions);

  // console.log("result:", result);
  // console.log("result?.error?.originalStatus:", result?.error?.originalStatus);

  if (result?.error?.originalStatus === 403) {
    console.log("JUST AFTER if result === 403");

    console.log("Sending Access Token");
    // send the refresh token to get new access token
    const refreshResult = await baseQuery(
      "/auth/token/refresh/",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // retry the original query with a new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
