// External dependencies

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  createEntityAdapter,
  EntityState,
  SerializedError,
} from "@reduxjs/toolkit";

// Internal dependencies

import { apiSlice } from "../apiSlice";
import {
  applyOptimisticPostUpdate,
  errorTransformer,
  invalidatesList,
  providesList,
} from "../../../hooks/reduxHooks";
import { IPost, IRePost } from "../../../components/post/types";
import {
  IPostPick,
  ICreatePostParams,
  IResponse,
  IErrorResponse,
} from "../types";
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
        response.data.forEach((post) => {
          post.comments = commentAdapter.setAll(
            commentAdapter.getInitialState(),
            post.comments as IComment[]
          );
        });
        return postAdapter.setAll(postAdapter.getInitialState(), response.data);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      providesTags: (result, error, arg) => providesList(result?.ids, "Post"),
    }),

    getPostsByUser: builder.query<EntityState<IPost | IRePost>, string>({
      query: (userId) => `/api/posts/user/${userId}`,
      transformResponse: (response: IResponse<string, (IPost | IRePost)[]>) => {
        response.data.forEach((post) => {
          post.comments = commentAdapter.setAll(
            commentAdapter.getInitialState(),
            post.comments as IComment[]
          );
        });
        return postAdapter.setAll(postAdapter.getInitialState(), response.data);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
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
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
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
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
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
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
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
      onQueryStarted({ _id, userId }, { dispatch, queryFulfilled }) {
        const resultGetPosts = dispatch(
          postApiSlice.util.updateQueryData("getPosts", "", (draft) => {
            applyOptimisticPostUpdate({ draft, postId: _id, userId });
          })
        );
        const resultGetPostsByUser = dispatch(
          postApiSlice.util.updateQueryData(
            "getPostsByUser",
            userId,
            (draft) => {
              applyOptimisticPostUpdate({ draft, postId: _id, userId });
            }
          )
        );
        Promise.all([
          queryFulfilled.catch(resultGetPosts.undo),
          queryFulfilled.catch(resultGetPostsByUser.undo),
        ]);
      },
      transformResponse: (response: IResponse<string, IPost | IRePost>) => {
        return response.data;
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
