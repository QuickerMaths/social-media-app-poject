import { useCallback, useRef } from "react";
import { useAppDispatch } from "./reduxHooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type IActionToDispatchWithUserId = ActionCreatorWithPayload<
  {
    userId: number;
    page: number;
  },
  "pagination/setUserPostPage"
>;

type IActionToDispatch = ActionCreatorWithPayload<
  number,
  | "pagination/setPostPage"
  | "pagination/setCommentPage"
  | "pagination/setFriendRequestPage"
>;
interface Props {
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  userId?: number;
  actionToDispatch: IActionToDispatch | IActionToDispatchWithUserId;
  hasNextPage: boolean;
}

const useLastRef = ({
  isLoading,
  isFetching,
  page,
  userId,
  actionToDispatch,
  hasNextPage,
}: Props): ((instance: HTMLLIElement | null) => void) => {
  const dispatch = useAppDispatch();

  const intObs = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (post: HTMLLIElement | null) => {
      if (isLoading || isFetching) return;
      if (intObs.current) intObs.current.disconnect();
      intObs.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          if (
            userId &&
            actionToDispatch.type === "pagination/setUserPostPage"
          ) {
            dispatch(actionToDispatch({ userId, page: page + 1 }));
          } else if (
            actionToDispatch.type === "pagination/setPostPage" ||
            actionToDispatch.type === "pagination/setCommentPage" ||
            actionToDispatch.type === "pagination/setFriendRequestPage"
          ) {
            dispatch(actionToDispatch(page + 1));
          }
        }
      });
      if (post) intObs.current.observe(post);
    },
    [isLoading, isFetching, page, actionToDispatch]
  );

  return lastPostRef;
};

export default useLastRef;
