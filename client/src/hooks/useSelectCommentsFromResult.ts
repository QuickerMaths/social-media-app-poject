// External dependencies

import { EntityId, EntityState } from "@reduxjs/toolkit";

// Internal dependencies

import { IComment } from "../components/comment/types";
import {
  useGetPostsByUserQuery,
  useGetPostsQuery,
} from "../features/apiSlice/postApiSlice/postApiSlice";

interface Props {
  userId: string | undefined;
  postEntityId: EntityId;
  commentEntityId: EntityId;
}

export const useSelectCommentsFromResult = ({
  userId,
  postEntityId,
  commentEntityId,
}: Props): IComment | undefined => {
  if (userId) {
    const { comments } = useGetPostsByUserQuery(userId, {
      selectFromResult: ({ data }) => ({
        comments: (
          data?.entities[postEntityId]?.comments as EntityState<IComment>
        )?.entities[commentEntityId],
      }),
    });
    return comments;
  } else {
    const { comments } = useGetPostsQuery("", {
      selectFromResult: ({ data }) => ({
        comments: (
          data?.entities[postEntityId]?.comments as EntityState<IComment>
        )?.entities[commentEntityId],
      }),
    });
    return comments;
  }
};
