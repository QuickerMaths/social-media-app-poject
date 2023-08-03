// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IComment } from "../../../components/comment/types";
import { IRePostOrPost } from "../types";
import { postApiSlice } from "../postApiSlice/postApiSlice";
import { EntityState } from "@reduxjs/toolkit";
import { applyOptimisticCommentUpdate } from "../../../hooks/reduxHooks";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<
      IComment,
      Pick<IComment, "commentBody"> & IRePostOrPost & { userId: string }
    >({
      query: ({ commentBody, userId, _id, isRePost }) => ({
        url: `/api/comments`,
        method: "POST",
        body: { commentBody, userId, postId: _id, isRePost },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg._id }],
    }),

    deleteComment: builder.mutation<IComment, Pick<IComment, "_id" | "postId">>(
      {
        query: ({ _id, postId }) => ({
          url: `/api/comments`,
          method: "DELETE",
          body: { commentId: _id, postId },
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Post", id: arg.postId },
        ],
      }
    ),

    likeComment: builder.mutation<
      IComment,
      Pick<IComment, "_id" | "postId"> & { userId: string }
    >({
      query: ({ _id, userId }) => ({
        url: `/api/comments`,
        method: "PUT",
        body: { commentId: _id, userId },
      }),
      onQueryStarted({ _id, postId, userId }, { dispatch, queryFulfilled }) {
        const resultGetPosts = dispatch(
          postApiSlice.util.updateQueryData("getPosts", "", (draft) => {
            applyOptimisticCommentUpdate({
              draft,
              postId,
              commentId: _id,
              userId,
            });
          })
        );
        const resultGetPostsByUser = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostsByUser",
            userId,
            (draft) => {
              applyOptimisticCommentUpdate({
                draft,
                postId,
                commentId: _id,
                userId,
              });
            }
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetPosts.undo),
          queryFulfilled.catch(resultGetPostsByUser.undo),
        ]);
      },
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = commentApiSlice;
