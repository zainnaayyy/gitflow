// Slice Related to Django Backend Endpoints Management
import { apiSlice } from "../../app/api/apiSlice";

export const DjangoVoipEndpointsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Endpoints"],

  endpoints: (builder) => ({
    getDjangoVoipExtensions: builder.query({
      query: () => "/asterisk/endpoints/extensions-list/",
      providesTags: ["Endpoints"],
    }),
    getDjangoVoipDIDs: builder.query({
      query: () => "/asterisk/endpoints/dids-list/",
      providesTags: ["Endpoints"],
    }),
  }),
});

export const { useGetDjangoVoipExtensionsQuery, useGetDjangoVoipDIDsQuery } =
  DjangoVoipEndpointsApiSlice;
