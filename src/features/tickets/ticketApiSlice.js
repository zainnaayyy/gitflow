import { apiSlice } from "../../app/api/apiSlice";

export const TicketApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Tickets"],

  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/tickets/tickets-list/",
      transformResponse: (res) => res.sort((a, b) => a.id - a.id),
      providesTags: ["Tickets"],
    }),
    getTicketCategory: builder.query({
      query: () => "/tickets/category-list/",
      providesTags: ["Tickets"],
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: "/tickets/ticket-create/",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    updateTicket: builder.mutation({
      query: (args) => {
        const ticketId = args[0];
        const data = args[1];
        return {
          url: `/tickets/ticket-update/${ticketId}/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    deleteTicket: builder.mutation({
      query: (ticket) => ({
        url: `/tickets/ticket-delete/${ticket.id}`,
        method: "DELETE",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketCategoryQuery,
  useAddTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = TicketApiSlice;
