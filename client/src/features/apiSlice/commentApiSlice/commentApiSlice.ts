// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IComment } from "../../../components/comment/types";
import { IRePostOrPost } from "../types";
import { postApiSlice } from "../postApiSlice/postApiSlice";
import { EntityState } from "@reduxjs/toolkit";

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
      async onQueryStarted(
        { _id, postId, userId },
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          postApiSlice.util.updateQueryData("getPosts", "", (draft) => {
            const comment = (
              draft.entities[postId]?.comments as EntityState<IComment>
            ).entities[_id];
            if (comment) {
              if (comment.likedBy.includes(userId)) {
                comment.likedBy = comment.likedBy.filter((id) => id !== userId);
              } else {
                comment.likedBy.push(userId);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = commentApiSlice;
