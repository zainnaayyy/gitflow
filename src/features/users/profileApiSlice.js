import { apiSlice } from "../../app/api/apiSlice";

export const ProfileApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Profiles"],

  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => "/api/list-employees/",
      providesTags: ["Profiles"],
    }),
    getProfileImage: builder.query({
      query: (userId) => `/api/user-image/${userId}`, // Replace with your Django API endpoint to fetch the image URL
    }),
  }),
});

export const { useGetProfilesQuery, useGetProfileImageQuery } = ProfileApiSlice;
