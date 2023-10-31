// External dependencies

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

// Internal dependencies

import { apiSlice } from "../apiSlice";
import {
  applyOptimisticPostUpdate,
  errorTransformer,
  providesList,
} from "../../../hooks/reduxHooks";
import { IPost } from "../../../components/post/types";
import { ICreatePostParams, IErrorResponse } from "../types";

//TODO: after implementing authorization on backend, add loggedInUserId to get endpoints to check if user liked post

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], { page: number | void }>({
      query: ({ page = 1 }) => `/api/post?page=${page}&pageSize=20`,

      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (result, _error, _arg) => providesList(result, "Post"),
    }),

    getPostsByUser: builder.query<
      IPost[],
      { userId: number; page: number | void }
    >({
      query: ({ userId, page = 1 }) =>
        `/api/post/user/${userId}?page=${page}&pageSize=20`,

      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (result, _error, _arg) => providesList(result, "Post"),
    }),

    //TODO: write getPostById query, with paginated comments

    createPost: builder.mutation<IPost, ICreatePostParams>({
      query: ({ userId, post_text, media_location, shared_post_id }) => ({
        url: `/api/post`,
        method: "POST",
        body: {
          userId,
          postCreateData: {
            post_text,
            media_location,
            shared_post_id,
          },
        },
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),

      invalidatesTags: (_result, error, _req) => (error ? [] : ["Post"]),
    }),

    deletePost: builder.mutation<{}, Pick<IPost, "id">>({
      query: ({ id }) => ({
        url: `/api/post/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: "Post", id }],
    }),

    updatePost: builder.mutation<
      IPost,
      Pick<IPost, "id" | "post_text" | "media_location">
    >({
      query: ({ id, post_text, media_location }) => ({
        url: `/api/post/${id}`,
        method: "PATCH",
        body: {
          post_text,
          media_location,
        },
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: "Post", id }],
    }),

    likePost: builder.mutation<IPost, Pick<IPost, "id"> & { userId: number }>({
      query: ({ id, userId }) => ({
        url: `/api/post/${id}/like`,
        method: "POST",
        body: {
          userId,
        },
      }),
      onQueryStarted({ id, userId }, { dispatch, queryFulfilled, getState }) {
        const resultGetPosts = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            //@ts-ignore
            { page: getState().pagination.postPage },
            (draft) => {
              applyOptimisticPostUpdate({ draft, postId: id });
            }
          )
        );
        const resultGetPostsByUser = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostsByUser",
            //@ts-ignore
            { userId, page: getState().pagination.postPage },
            (draft) => {
              applyOptimisticPostUpdate({ draft, postId: id });
            }
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetPosts.undo),
          queryFulfilled.catch(resultGetPostsByUser.undo),
        ]);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
} = postApiSlice;
