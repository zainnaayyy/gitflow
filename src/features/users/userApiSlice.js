import { apiSlice } from "../../app/api/apiSlice";

export const UserApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/list-employees/",
      providesTags: ["Users"],
    }),
    getUsersPaginated: builder.query({
      query: ({ page = 1, pageSize = 5, search = "" }) =>
        `/api/list-employees-paginated/?page=${page}&search=${search} `, // SEARCH API
      providesTags: ["Users"],
    }),
    getOtherUsers: builder.query({
      query: () => "/api/list-other-employees/",
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/api/detail-user/${id}/`, // FAZER FUNFAR, CREATE DJANGO ENDPOINT
      providesTags: ["Users"],
    }),
    addUsers: builder.mutation({
      query: (user_data) => ({
        url: "/api/create-user/",
        method: "POST",
        body: user_data,
      }),
      invalidatesTags: ["Users"],
    }),

    // User Type Query
    getUserType: builder.query({
      query: () => "/api/list-user-type/",
      providesTags: ["Users"],
    }),
    uploadUserImage: builder.mutation({
      query: (data) => ({
        url: "/api/user-image-upload/",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetOtherUsersQuery,
  useGetUserQuery,
  useAddUsersMutation,
  useGetUserTypeQuery,
  useUploadUserImageMutation,
} = UserApiSlice;
