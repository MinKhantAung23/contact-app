import { configureStore } from "@reduxjs/toolkit";
import { ApiService } from "./service/ApiService";

export const store = configureStore({
    reducer: {
        [ApiService.reducerPath]: ApiService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiService.middleware),
});