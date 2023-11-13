// External dependencies

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IComment } from "../../../components/comment/types";
import { IErrorResponse } from "../types";
import { postApiSlice } from "../postApiSlice/postApiSlice";
import {
  applyOptimisticCommentUpdate,
  errorTransformer,
} from "../../../hooks/reduxHooks";
import { IPost } from "../../../components/post/types";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //TODO: after implementing authorization on backend, change userId to loggedInUserId
    createComment: builder.mutation<
      IComment,
      Pick<IComment, "comment_text"> & Pick<IPost, "id">
    >({
      query: ({ comment_text, id }) => ({
        url: `/api/comment`,
        method: "POST",
        body: {
          comment_text,
          post_id: id,
        },
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (_result, error, arg) =>
        error ? [] : [{ type: "Post", id: arg.id }],
    }),

    deleteComment: builder.mutation<IComment, Pick<IComment, "id" | "post_id">>(
      {
        query: ({ id }) => ({
          url: `/api/comment/${id}`,
          method: "DELETE",
          credentials: "include",
        }),
        transformErrorResponse: (
          error: FetchBaseQueryError | IErrorResponse | SerializedError
        ) => errorTransformer(error),
        invalidatesTags: (_result, error, arg) =>
          error ? [] : [{ type: "Post", id: arg.post_id }],
      }
    ),

    likeComment: builder.mutation<
      IComment,
      Pick<IComment, "id" | "post_id"> & { userId: number }
    >({
      query: ({ id }) => ({
        url: `/api/comment/${id}/like`,
        method: "POST",
        credentials: "include",
      }),
      onQueryStarted(
        { id, post_id, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        const resultGetPosts = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            //@ts-ignore
            { page: getState().pagination.postPage },
            (draft) => {
              applyOptimisticCommentUpdate({
                draft,
                postId: post_id,
                commentId: id,
              });
            }
          )
        );

        const resultGetPostsByUser = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostsByUser",
            //@ts-ignore
            { userId, page: getState().pagination.postPage },
            (draft) => {
              applyOptimisticCommentUpdate({
                draft,
                postId: post_id,
                commentId: id,
              });
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
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = commentApiSlice;
