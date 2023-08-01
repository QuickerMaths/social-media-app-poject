// Internal dependencies

import { apiSlice } from "../apiSlice";
import { invalidatesList, providesList } from "../../../hooks/reduxHooks";
import { IPost, IRePost } from "../../../components/post/types";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IPostPick, ICreatePostParams, IResponse } from "../types";
import { errorMessageHandler } from "../../../utilities/errorMessageHandler";
import { IComment } from "../../../components/comment/types";

const postAdapter = createEntityAdapter<IPost | IRePost>({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const commentAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<IPost | IRePost>, string>({
      query: () => "/api/posts",
      transformResponse: (response: IResponse<string, (IPost | IRePost)[]>) => {
        const posts: (IPost | IRePost)[] = response.data;
        posts.forEach((post) => {
          post.comments = commentAdapter.setAll(
            commentAdapter.getInitialState(),
            post.comments as IComment[]
          );
        });
        return postAdapter.setAll(postAdapter.getInitialState(), posts);
      },
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
      providesTags: (result, error, arg) => providesList(result?.ids, "Post"),
    }),

    getPostsByUser: builder.query<EntityState<IPost | IRePost>, string>({
      query: (userId) => `/api/posts/user/${userId}`,
      transformResponse: (response: IResponse<string, (IPost | IRePost)[]>) => {
        return postAdapter.setAll(postAdapter.getInitialState(), response.data);
      },
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
      providesTags: (result, error, arg) => providesList(result?.ids, "Post"),
    }),

    createPost: builder.mutation<IPost | IRePost, ICreatePostParams>({
      query: ({ postBody, _id, isRePost, originalPost, postImage }) => ({
        url: `/api/${isRePost ? "repost" : "posts"}`,
        method: "POST",
        body: isRePost
          ? {
              postBody,
              postId: originalPost,
              userId: _id,
            }
          : {
              postBody,
              postImage,
              _id,
            },
      }),
      transformResponse: (response: IResponse<string, IPost | IRePost>) => {
        return response.data;
      },
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
      invalidatesTags: invalidatesList("Post"),
    }),

    deletePost: builder.mutation<
      null,
      Pick<IPost | IRePost, "_id" | "isRePost">
    >({
      query: ({ _id, isRePost }) => ({
        url: `/api/${isRePost ? "repost" : "posts"}`,
        method: "DELETE",
        body: {
          _id,
        },
      }),
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
      invalidatesTags: (result, error, req) => [{ type: "Post", id: req._id }],
    }),

    updatePost: builder.mutation<
      IPost,
      IPostPick | Omit<ICreatePostParams, "originalPost">
    >({
      query: ({ postBody, _id, isRePost, postImage }) => ({
        url: `/api/${isRePost ? "repost" : "posts"}/edit`,
        method: "PUT",
        body: isRePost
          ? {
              postBody,
              postId: _id,
            }
          : {
              postBody,
              postImage,
              postId: _id,
            },
      }),
      transformResponse: (response: IResponse<string, IPost>) => {
        return response.data;
      },
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
      invalidatesTags: (result, error, req) => [{ type: "Post", id: req._id }],
    }),

    likePost: builder.mutation<
      IPost | IRePost,
      Pick<IPost | IRePost, "_id" | "isRePost"> & { userId: string }
    >({
      query: ({ _id, isRePost, userId }) => ({
        url: `/api/${isRePost ? "repost" : "posts"}`,
        method: "PUT",
        body: {
          postId: _id,
          userId,
        },
      }),
      async onQueryStarted({ _id, userId }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          postApiSlice.util.updateQueryData("getPosts", "", (draft) => {
            const post = draft.entities[_id];
            if (post) {
              if (post.likedBy.includes(userId)) {
                post.likedBy = post.likedBy.filter((id) => id !== userId);
              } else {
                post.likedBy.push(userId);
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
      transformResponse: (response: IResponse<string, IPost | IRePost>) => {
        return response.data;
      },
      transformErrorResponse: (error: IResponse<number, { error: string }>) => {
        return errorMessageHandler(error.status);
      },
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
