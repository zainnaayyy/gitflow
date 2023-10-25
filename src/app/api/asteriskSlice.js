import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const asteriskSlice = createApi({
  reducerPath: "asteriskSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: "192.168.1.5",
    baseUrl: "https://asterisk.iqbot.live",
  }),
  endpoints: (builder) => ({}),
});
