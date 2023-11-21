// External dependencies

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError, createEntityAdapter } from "@reduxjs/toolkit";

// Internal dependencies

import { apiSlice } from "../apiSlice";
import { IComment } from "../../../components/comment/types";
import { IErrorResponse, IResponse } from "../types";
import { postAdapter, postApiSlice } from "../postApiSlice/postApiSlice";
import {
  applyOptimisticPostByIdCommentUpdate,
  applyOptimisticCommentUpdate,
  errorTransformer,
} from "../../../hooks/reduxHooks";
import { IPost } from "../../../components/post/types";

export const commentAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
});

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<
      IResponse<IComment>,
      Pick<IComment, "comment_text"> &
        Pick<IPost, "id"> & { userId: number | undefined }
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
      async onQueryStarted(
        { id, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        await queryFulfilled.then((result) => {
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostById",
              {
                //@ts-ignore
                page: getState().pagination.commentPage,
                id,
              },
              (draft) => {
                commentAdapter.upsertOne(draft.comments, result.data.data);
              }
            )
          );
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPosts",
              //@ts-ignore
              { page: getState().pagination.postPage },
              (draft) => {
                const post = draft.entities[id] as IPost;
                postAdapter.updateOne(draft, {
                  id,
                  changes: {
                    comments:
                      post.comments.length > 0
                        ? [result.data.data, post.comments[0]]
                        : [result.data.data],
                    comment_count: (post?.comment_count as number) + 1,
                  },
                });
              }
            )
          );
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPostsByUser",
              {
                //@ts-ignore
                userId,
                //@ts-ignore
                page: getState().pagination.userPostPage,
              },
              (draft) => {
                const post = draft.entities[id] as IPost;
                postAdapter.updateOne(draft, {
                  id,
                  changes: {
                    comments:
                      post.comments.length > 0
                        ? [result.data.data, post.comments[0]]
                        : [result.data.data],
                    comment_count: (post?.comment_count as number) + 1,
                  },
                });
              }
            )
          );
        });
      },
    }),

    deleteComment: builder.mutation<
      {},
      Pick<IComment, "id" | "post_id"> & { userId: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/api/comment/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      onQueryStarted(
        { id, post_id, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        const getPostsResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            //@ts-ignore
            { page: getState().pagination.postPage },
            (draft) => {
              postAdapter.updateOne(draft, {
                id: post_id,
                changes: {
                  comments: draft.entities[post_id]?.comments.filter(
                    (comment) => comment.id !== id
                  ),
                  comment_count:
                    (draft.entities[post_id]?.comment_count as number) - 1,
                },
              });
            }
          )
        );
        const getPostsByUserResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostsByUser",
            {
              //@ts-ignore
              page: getState().pagination.postPage,
              //@ts-ignore
              userId,
            },
            (draft) => {
              postAdapter.updateOne(draft, {
                id: post_id,
                changes: {
                  comments: draft.entities[post_id]?.comments.filter(
                    (comment) => comment.id !== id
                  ),
                  comment_count:
                    (draft.entities[post_id]?.comment_count as number) - 1,
                },
              });
            }
          )
        );
        const getPostByIdResult = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostById",
            //@ts-ignore
            { id: post_id },
            (draft) => {
              commentAdapter.removeOne(draft.comments, id);
            }
          )
        );
        Promise.all([
          queryFulfilled.catch(getPostsResult.undo),
          queryFulfilled.catch(getPostsByUserResult.undo),
          queryFulfilled.catch(getPostByIdResult.undo),
        ]);
      },
    }),

    likeComment: builder.mutation<
      IComment,
      Pick<IComment, "id" | "post_id"> & { userId: number | undefined }
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
        const resultGetPostById = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostById",
            //@ts-ignore
            { id: post_id },
            (draft) => {
              applyOptimisticPostByIdCommentUpdate({
                draft,
                commentId: id,
              });
            }
          )
        );

        Promise.all([
          queryFulfilled.catch(resultGetPosts.undo),
          queryFulfilled.catch(resultGetPostsByUser.undo),
          queryFulfilled.catch(resultGetPostById.undo),
        ]);
      },
      transformResponse: (response: IResponse<IComment>) => response.data,
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
