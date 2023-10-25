import { apiSlice } from "../../app/api/apiSlice";

export const stasisApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Statis"],

  endpoints: (builder) => ({
    addStasis: builder.mutation({
      query: (data) => ({
        url: "/asterisk/start-matrix-stasis/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stasis"],
    }),
    getStasis: builder.query({
      query: () => "/asterisk/check-matrix-stasis/",
      providesTags: ["Stasis"],
    }),
  }),
});

export const { useAddStasisMutation, useGetStasisQuery } = stasisApiSlice;
