
import { ApiService } from "../ApiService";

const contactEndpoints = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (arg) => ({
                url: "contact",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["contact"],
        }),
        get: builder.query({
            query: () => "contact",
            providesTags: ["contact"],
        }),
        delete: builder.mutation({
            query: (arg) => ({
                url: `contact/${arg}`,
                method: "DELETE",
            }),
            invalidatesTags: ["contact"],
        }),
        update: builder.mutation({
            query: (arg) => ({
                url: `contact/${arg.id}`,
                method: "PUT",
                body: arg,
            }),
            invalidatesTags: ["contact"],
        }),
    })
})

export const { useCreateMutation, useGetQuery, useDeleteMutation, useUpdateMutation } = contactEndpoints;