import { apiSlice } from "../../app/api/apiSlice";

export const logsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Logs"],

  endpoints: (builder) => ({
    getCallLog: builder.query({
      query: () => "/logs/call-log/",
      providesTags: ["Logs"],
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),
  }),
});

export const { useGetCallLogQuery } = logsApiSlice;
