export type ICommentOwner = {
  id: number;
  username: string;
  avatar_url: string;
};

export type IComment = {
  id: number;
  profile_id: number;
  comment_owner: ICommentOwner;
  post_id: number;
  comment_owner_username: string;
  comment_owner_avatar_url: string | null;
  comment_text: string;
  like_count: number;
  is_liked: boolean | null;
  created_at: string;
  updated_at: string;
};
