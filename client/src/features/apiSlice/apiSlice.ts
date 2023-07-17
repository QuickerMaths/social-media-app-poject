import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:5000`,
      "Content-Type": "application/json",
      ["x-requested-with"]: "XMLHttpRequest",
    },
  }),
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({}),
});
