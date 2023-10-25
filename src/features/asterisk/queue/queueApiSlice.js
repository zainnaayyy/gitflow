import { apiSlice } from "../../../app/api/apiSlice";

export const QueueSlice = apiSlice.injectEndpoints({
  tagTypes: ["Queue"],

  endpoints: (builder) => ({
    getQueue: builder.query({
      query: () => `/asterisk/queues/queue-list/`,
      providesTags: ["Queue"],
    }),
    getCustomerPosition: builder.query({
      query: () => `/asterisk/queues/position-customer-list/`,
      providesTags: ["Queue"],
    }),
    getAttendantPosition: builder.query({
      query: () => `/asterisk/queues/position-attendant-list/`,
      providesTags: ["Queue"],
    }),
  }),
});

export const {
  useGetQueueQuery,
  useGetCustomerPositionQuery,
  useGetAttendantPositionQuery,
} = QueueSlice;
