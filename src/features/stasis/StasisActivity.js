import { apiSlice } from "../../app/api/apiSlice";

export const stasisActivityApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["StatisActivity"],

  endpoints: (builder) => ({
    getBridgedChannelsActivity: builder.query({
      query: () => "/asterisk/stasis/bridged-channels-activity/",
      providesTags: ["StasisActivity"],
    }),
    getChannelsActivity: builder.query({
      query: () => "/asterisk/stasis/channels-activity/",
      providesTags: ["StasisActivity"],
    }),
    getChannelsActivityItem: builder.query({
      query: () => "/asterisk/stasis/channels-activity-item/",
      providesTags: ["StasisActivity"],
    }),
    getCallsActivity: builder.query({
      query: ({ page = 1, pageSize = 5, search = "" }) =>
        `/asterisk/stasis/calls-activity/?page=${page}&search=${search}`,
      // `/dummy-data/?page=${page}&page_size=${pageSize}`,  only to remember
    }),
    getChannelsActivityItemDetail: builder.query({
      query: ({ itemId }) => {
        console.log("itemId:::", itemId);
        return `/asterisk/stasis/calls-activity-item-details/${itemId}/`;
      },
      providesTags: ["StasisActivity"],
    }),

    // Create the asterisk registration instance in StasisChannelActivity, yet without the channel.id
    getChannelActivityRegistrationCreate: builder.mutation({
      query: (extension) => {
        return {
          url: `/asterisk/stasis/channel-activity-registration-create/${extension}/`,
          method: "POST",
          // body: extension,
        };
      },
    }),
  }),
});

export const {
  useGetBridgedChannelsActivityQuery,
  useGetChannelsActivityQuery,
  useGetChannelsActivityItemQuery,
  useGetCallsActivityQuery,
  useGetChannelsActivityItemDetailQuery,
  useGetChannelActivityRegistrationCreateMutation,
} = stasisActivityApiSlice;
