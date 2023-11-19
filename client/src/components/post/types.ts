import { EntityState } from "@reduxjs/toolkit";
import { IComment } from "../comment/types";
import { IMetaData } from "../../features/apiSlice/types";

export type IPostOwner = {
  id: number;
  username: string;
  avatar_url: string;
};

export type IPost = {
  id: number;
  profile_id: number;
  post_owner: IPostOwner;
  shared_post_id: number | null;
  shared_post: {
    created_at: string;
    media_location: string | null;
    post_text: string | null;
    post_owner: IPostOwner;
  };
  post_text?: string | null;
  media_location?: string | null;
  share_count: number;
  comment_count: number;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  is_liked: boolean | null;
  like_count: number;
  comments: IComment[];
};

export type IPostWithNormalizedComments = {
  id: number;
  profile_id: number;
  post_owner: IPostOwner;
  shared_post_id: number | null;
  shared_post: {
    created_at: string;
    media_location: string | null;
    post_text: string | null;
    post_owner: IPostOwner;
  };
  post_text?: string | null;
  media_location?: string | null;
  share_count: number;
  comment_count: number;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  is_liked: boolean | null;
  like_count: number;
  comments: EntityState<IComment> & { meta: IMetaData };
};
