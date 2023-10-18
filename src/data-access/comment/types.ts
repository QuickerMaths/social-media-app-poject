export type CommentCreateDataType = {
  profile_id: number;
  post_id: number;
  comment_text: string;
};

export type CommentUpdateDataType = {
  comment_text: string;
};
