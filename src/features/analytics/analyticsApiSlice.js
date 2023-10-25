import { apiSlice } from "../../app/api/apiSlice";

export const AnalyticsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Analytics"],

  endpoints: (builder) => ({
    getCarrier: builder.query({
      query: () => "/analytics/analytics-api/carrier/",
    }),
    getAmbetter: builder.query({
      query: () => "/analytics/analytics-api/ambetter-api/",
      providesTags: ["Analytics"],
    }),
    getBcbs: builder.query({
      query: () => "/analytics/analytics-api/bcbs-api/",
      providesTags: ["Analytics"],
    }),
    getUnitedHealthcare: builder.query({
      query: () => "/analytics/analytics-api/unitedhealthcare-api/",
      providesTags: ["Analytics"],
    }),
    getCaresource: builder.query({
      query: () => "/analytics/analytics-api/caresource-api/",
      providesTags: ["Analytics"],
    }),
    getTest: builder.query({
      query: () => "/analytics/analytics-api/test-api/",
    }),
  }),
});

export const {
  useGetAmbetterQuery,
  useGetCaresourceQuery,
  useGetCarrierQuery,
  useGetBcbsQuery,
  useGetUnitedHealthcareQuery,
  useGetTestQuery,
} = AnalyticsApiSlice;
