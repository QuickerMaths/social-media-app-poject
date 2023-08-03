// External dependencies

import { EntityId } from "@reduxjs/toolkit";

// Internal dependencies

import { IPost, IRePost } from "../components/post/types";
import {
  useGetPostsByUserQuery,
  useGetPostsQuery,
} from "../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  userId: string | undefined;
  postId: EntityId;
}

export const useSelectPostFromResult = ({
  userId,
  postId,
}: Props): IPost | IRePost => {
  if (userId) {
    const { post } = useGetPostsByUserQuery(userId, {
      selectFromResult: ({ data }) => ({
        post: data?.entities[postId] as IRePost | IPost,
      }),
    });
    return post;
  } else {
    const { post } = useGetPostsQuery("", {
      selectFromResult: ({ data }) => ({
        post: data?.entities[postId] as IRePost | IPost,
      }),
    });
    return post;
  }
};
