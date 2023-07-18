// Internal dependencies

import { apiSlice } from "../apiSlice";
import { invalidatesList, providesList } from "../../../hooks/reduxHooks";
import { IPost, IRePost } from "../../../components/post/types";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IResponse } from "../types";
import { errorMessageHandler } from "../../../utilities/errorMessageHandler";

const postAdapter = createEntityAdapter<IPost | IRePost>({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<IPost | IRePost>, string>({
      query: () => "/api/posts",
      transformResponse: (response: (IPost | IRePost)[]) => {
        return postAdapter.setAll(postAdapter.getInitialState(), response);
      },
      providesTags: (result, error, arg) => providesList(result?.ids, "Post"),
    }),
    getPostsByUser: builder.query<EntityState<IPost | IRePost>, string>({
      query: (userId) => `/api/posts/user/${userId}`,
      transformResponse: (response: (IPost | IRePost)[]) => {
        return postAdapter.setAll(postAdapter.getInitialState(), response);
      },
      providesTags: (result, error, arg) => providesList(result?.ids, "Post"),
    }),
    createPost: builder.mutation<
      IPost,
      Pick<IPost, "postBody" | "_id" | "postImage">
    >({
      query: (body) => ({
        url: "/api/posts",
        method: "POST",
        body,
      }),
      transformErrorResponse: (
        error: IResponse<number, { message: string }>
      ) => {
        return (error.data.message = errorMessageHandler(error.status));
      },
      invalidatesTags: invalidatesList("Post"),
    }),
    deletePost: builder.mutation<IPost, Pick<IPost, "_id">>({
      query: (body) => ({
        url: "/api/posts",
        method: "DELETE",
        body,
      }),
      transformErrorResponse: (error) => {
        return error.data;
      },
      invalidatesTags: (result, error, req) => [{ type: "Post", id: req._id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
