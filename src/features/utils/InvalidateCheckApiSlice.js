import { apiSlice } from "../../app/api/apiSlice";

// Think in a way to dispatch the Invalidate Check Api from just one online user, ever if there are multiple connectet

export const InvalidateCheckApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvalidateCheck: builder.query({
      query: () => "/monitoring/invalidate/check/",
    }),
    getInvalidatePost: builder.mutation({
      query: (user) => ({
        url: "/api/create-customer/",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useGetInvalidateCheckQuery, useGetInvalidatePostMutation } =
  InvalidateCheckApiSlice;
