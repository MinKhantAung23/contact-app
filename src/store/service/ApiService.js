import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiService = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://contact.sankyitar.store/api/v1/",
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${JSON.parse(token)}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
});