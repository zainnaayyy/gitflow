import { apiSlice } from "../../app/api/apiSlice";

export const AddressApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "/api/addresses-list/",
      tagTypes: ["Address"],
    }),
    addAddress: builder.mutation({
      query: (xxx) => ({
        url: "/api/create-address/",
        method: "POST",
        body: xxx,
      }),
      invalidatesTags: ["Address"],
    }),
    collectCoords: builder.mutation({
      query: () => ({
        url: "/api/collect-coords/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useCollectCoordsMutation,
} = AddressApiSlice;
