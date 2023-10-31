// External dependencies

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { MaybeDrafted } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Internal dependencies

import { IErrorResponse, isIErrorResponse } from "../features/apiSlice/types";
import { IPost } from "../components/post/types";
import { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type CacheItem<T, ID> = { type: T; id: ID };

export function providesList<R extends any[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const invalidatesList =
  <T extends string>(type: T) =>
  (): readonly [CacheItem<T, "LIST">] =>
    [{ type, id: "LIST" }] as const;

export const errorTransformer = (
  error: FetchBaseQueryError | IErrorResponse | SerializedError
): string | undefined => {
  if (isIErrorResponse(error)) {
    return error.data.data.error;
  }

  if ("status" in error) {
    return "error" in error ? error.error : JSON.stringify(error.data);
  }

  return error.message;
};

type IOptimisticUpdateParams = {
  draft: MaybeDrafted<IPost[]>;
  postId: number;
  commentId?: number;
};

export function applyOptimisticPostUpdate({
  draft,
  postId,
}: IOptimisticUpdateParams) {
  const post = draft.find((post) => post.id === postId);
  if (post) {
    if (post.is_liked) {
      post.is_liked = false;
      post.like_count--;
    } else {
      post.is_liked = true;
      post.like_count++;
    }
  }
}

export function applyOptimisticCommentUpdate({
  draft,
  postId,
  commentId,
}: IOptimisticUpdateParams) {
  if (commentId) {
    const post = draft.find((post) => post.id === postId);

    if (post) {
      const comment = post.comments.find((comment) => comment.id === commentId);
      if (comment) {
        if (comment.is_liked) {
          comment.is_liked = false;
          comment.like_count--;
        } else {
          comment.is_liked = true;
          comment.like_count++;
        }
      }
    }
  }
}
