import { apiSlice } from "../../app/api/apiSlice";

export const CampaignsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Campaigns"],

  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => "/messaging/campaigns",
      providesTags: ["Campaigns"],
    }),
    getCampaignTemplate: builder.query({
      query: () => "/messaging/campaign-template",
      providesTags: ["Campaigns"],
    }),

    selectCampaign: builder.mutation({
      query: (data) => ({
        url: "/messaging/campaigns",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Campaigns"],
    }),

    getCampaignsSend: builder.query({
      query: () => "/messaging/campaign-send-list",
      providesTags: ["Campaigns"],
    }),

    addCampaignSendSelect: builder.mutation({
      query: (data) => ({
        url: "/messaging/campaign-send-select",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Campaigns"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignTemplateQuery,
  useSelectCampaignMutation,
  useGetCampaignsSendQuery,
  useAddCampaignSendSelectMutation,
} = CampaignsApiSlice;
