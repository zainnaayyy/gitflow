import { apiSlice } from "../../app/api/apiSlice";

export const CustomerApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "/api/list-customers/",
      tagTypes: ["Customer"],
    }),
    addCustomer: builder.mutation({
      query: (user) => ({
        url: "/api/create-customer/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Customer"],
    }),
    importCustomers: builder.mutation({
      query: () => ({
        url: "/api/import-customers",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useImportCustomersMutation,
} = CustomerApiSlice;
