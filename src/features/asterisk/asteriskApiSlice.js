// Slice Related to Asterisk ARI communication
import { asteriskSlice } from "../../app/api/asteriskSlice";

const key = "api_key=asterisk:BG!5sBGMFuNVDEFs$7K1aiB";

export const AsteriskApiSlice = asteriskSlice.injectEndpoints({
  tagTypes: ["Asterisk"],

  endpoints: (builder) => ({
    // QUERY REQUESTS
    getApplications: builder.query({
      query: () => `/ari/applications?${key}&app=matrix`,
      providesTags: ["Asterisk"],
    }),
    getEndpoints: builder.query({
      query: () => `/ari/endpoints?${key}&app=matrix`,
      providesTags: ["Asterisk"],
    }),
    getChannels: builder.query({
      query: () => `/ari/channels?${key}&app=matrix`,
      providesTags: ["Asterisk"],
    }),
    getBridges: builder.query({
      query: () => `/ari/bridges?${key}&app=matrix`,
      providesTags: ["Asterisk"],
    }),
    getLogs: builder.query({
      query: () => `/ari/asterisk/logging?${key}`,
      providesTags: ["Asterisk"],
    }),
    // POST REQUESTS
    createBridge: builder.mutation({
      query: () => ({
        url: `/ari/bridges?${key}&app=matrix`,
        method: "POST",
      }),
      invalidatesTags: ["Asterisk"],
    }),
    addChannelToBridge: builder.mutation({
      query: (args) => {
        const bridge = args[0];
        const channel = args[1];
        return {
          url: `/ari/bridges/${bridge}/addChannel?channel=${channel}&${key}`,
          method: "POST",
          body: { bridge, channel },
        };
      },
      invalidatesTags: ["Asterisk"],
    }),
    removeChannelFromBridge: builder.mutation({
      query: (args) => {
        const bridge = args[0];
        const channel = args[1];
        return {
          url: `/ari/bridges/${bridge}/removeChannel?channel=${channel}&${key}`,
          method: "POST",
          body: { bridge, channel },
        };
      },
      invalidatesTags: ["Asterisk"],
    }),
    // DELETE REQUESTS
    deleteBridge: builder.mutation({
      query: (bridge_id) => ({
        url: `/ari/bridges/${bridge_id}?${key}&app=matrix`,
        method: "DELETE",
      }),
      invalidatesTags: ["Asterisk"],
    }),
    deleteChannel: builder.mutation({
      query: (channel_id) => ({
        url: `/ari/channels/${channel_id}?${key}&app=matrix`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetEndpointsQuery,
  useGetChannelsQuery,
  useGetBridgesQuery,
  useCreateBridgeMutation,
  useAddChannelToBridgeMutation,
  useRemoveChannelFromBridgeMutation,
  useDeleteBridgeMutation,
  useGetLogsQuery,
  useDeleteChannelMutation,
} = AsteriskApiSlice;

// export { apiSlice }; DELETE

// NEED TO TEST, TO INVALIDATETAGS OUTSIDE RTK
// export const invalidateTagsAsteriskApi = AsteriskApiSlice.internalApi._cache;
// in jsx, just "import invalidateTagsAsteriskApi" and
// "invalidateTagsAsteriskApi.invalidateTags('users')"
