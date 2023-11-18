// External dependencies

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  EntityState,
  SerializedError,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// Internal dependencies

import { apiSlice } from "../apiSlice";
import {
  applyOptimisticPostUpdate,
  errorTransformer,
} from "../../../hooks/reduxHooks";
import { IPost } from "../../../components/post/types";
import { ICreatePostParams, IErrorResponse } from "../types";

export const postAdapter = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
});

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<IPost>, { page: number | void }>({
      query: ({ page = 1 }) => ({
        method: "GET",
        url: `/api/post?page=${page}&pageSize=1`,
        credentials: "include",
      }),
      transformResponse: (response: IPost[]) => {
        console.log(response);
        return postAdapter.setAll(postAdapter.getInitialState(), response);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        return postAdapter.addMany(
          currentCache,
          postAdapter.getSelectors().selectAll(newItems)
        );
      },
      // providesTags: (result, _error, _arg) => providesList(result?.ids, "Post"),
    }),

    getPostsByUser: builder.query<
      EntityState<IPost>,
      { userId: number; page: number | void }
    >({
      query: ({ userId, page = 1 }) => ({
        method: "GET",
        url: `/api/post/user/${userId}?page=${page}&pageSize=1`,
        credentials: "include",
      }),
      transformResponse: (response: IPost[]) => {
        return postAdapter.setAll(postAdapter.getInitialState(), response);
      },
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        return postAdapter.addMany(
          currentCache,
          postAdapter.getSelectors().selectAll(newItems)
        );
      },
      // providesTags: (result, _error, _arg) => providesList(result, "Post"),
    }),

    getPostById: builder.query<
      IPost,
      Pick<IPost, "id"> & { page: number | void }
    >({
      query: ({ id, page }) => ({
        method: "GET",
        url: `/api/post/${id}?page=${page}&pageSize=10`,
        credentials: "include",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<IPost, ICreatePostParams>({
      query: ({ post_text, media_location, shared_post_id }) => ({
        url: `/api/post`,
        method: "POST",
        body: {
          post_text,
          media_location,
          shared_post_id,
        },
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        queryFulfilled.then((result) => {
          dispatch(
            postApiSlice.util.updateQueryData(
              "getPosts",
              //@ts-ignore
              { page: getState().pagination.postPage },
              (draft) => {
                postAdapter.addOne(draft, result.data);
              }
            )
          );
        });
      },
      // invalidatesTags: (_result, error, _req) => (error ? [] : ["Post"]),
    }),

    deletePost: builder.mutation<{}, Pick<IPost, "id">>({
      query: ({ id }) => ({
        url: `/api/post/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      onCacheEntryAdded({ id }, { dispatch, getState }) {
        dispatch(
          postApiSlice.util.updateQueryData(
            "getPosts",
            //@ts-ignore
            { page: getState().pagination.postPage },
            (draft) => {
              postAdapter.removeOne(draft, id);
            }
          )
        );
      },
      // invalidatesTags: (_result, error, { id }) =>
      //   error ? [] : [{ type: "Post", id }],
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
        credentials: "include",
      }),
      transformErrorResponse: (
        error: FetchBaseQueryError | IErrorResponse | SerializedError
      ) => errorTransformer(error),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: "Post", id }],
    }),

    likePost: builder.mutation<
      IPost,
      Pick<IPost, "id"> & { userId: number | undefined }
    >({
      query: ({ id }) => ({
        url: `/api/post/${id}/like`,
        method: "POST",
        credentials: "include",
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
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
} = postApiSlice;
