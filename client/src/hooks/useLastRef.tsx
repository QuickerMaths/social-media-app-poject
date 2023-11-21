import { useCallback, useRef } from "react";
import { useAppDispatch } from "./reduxHooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type IActionToDispatchWithUserId = ActionCreatorWithPayload<
  {
    id: number;
    page: number;
  },
  "pagination/setUserPostPage" | "pagination/setCommentPage"
>;

type IActionToDispatch = ActionCreatorWithPayload<
  number,
  | "pagination/setPostPage"
  | "pagination/setFriendRequestPage"
  | "pagination/setUserPage"
>;
interface Props {
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  id?: number;
  actionToDispatch: IActionToDispatch | IActionToDispatchWithUserId;
  hasNextPage: boolean;
}

const useLastRef = ({
  isLoading,
  isFetching,
  page,
  id,
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
            (id && actionToDispatch.type === "pagination/setUserPostPage") ||
            actionToDispatch.type === "pagination/setCommentPage"
          ) {
            dispatch(actionToDispatch({ id: id as number, page: page + 1 }));
          } else if (
            actionToDispatch.type === "pagination/setPostPage" ||
            actionToDispatch.type === "pagination/setFriendRequestPage" ||
            actionToDispatch.type === "pagination/setUserPage"
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
