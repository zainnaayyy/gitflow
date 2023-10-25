import { apiSlice } from "../../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/token/',
                method: 'POST',
                body: { ...credentials }
            })
        }),

    })
})

export const { useLoginMutation } = authApiSlice // This hooks are automatically generated (instructor)

