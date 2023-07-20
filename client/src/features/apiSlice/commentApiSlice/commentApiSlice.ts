// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IComment } from "../../../components/comment/types";
import { IRePostOrPost } from "../types";

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
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentApiSlice;
