import { EntityId } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type CacheItem<T, ID> = { type: T; id: ID };

export function providesList<R extends EntityId[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map((id) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const invalidatesList =
  <T extends string>(type: T) =>
  (): readonly [CacheItem<T, "LIST">] =>
    [{ type, id: "LIST" }] as const;
