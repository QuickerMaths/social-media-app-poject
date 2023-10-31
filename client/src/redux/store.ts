import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice/apiSlice";
import authReducer from "../features/authSlice/authSlice";
import modalReducer from "../features/modalSlice/modalSlice";
import paginationReducer from "../features/paginationSlice/paginationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
