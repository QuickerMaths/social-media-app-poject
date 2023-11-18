import { useCallback, useRef } from "react";
import { useAppDispatch } from "./reduxHooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  actionToDispatch: ActionCreatorWithPayload<
    number,
    | "pagination/setPostPage"
    | "pagination/setCommentPage"
    | "pagination/setFriendRequestPage"
  >;
}

const useLastRef = ({
  isLoading,
  isFetching,
  page,
  actionToDispatch,
}: Props): ((instance: HTMLLIElement | null) => void) => {
  const dispatch = useAppDispatch();

  const intObs = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (post: HTMLLIElement | null) => {
      if (isLoading || isFetching) return;
      if (intObs.current) intObs.current.disconnect();
      intObs.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(actionToDispatch(page + 1));
        }
      });
      if (post) intObs.current.observe(post);
    },
    [isLoading, isFetching, page, actionToDispatch]
  );

  return lastPostRef;
};

export default useLastRef;
