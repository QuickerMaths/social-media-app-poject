type PostCreateDataType = {
  profile_id: number;
  shared_post_id?: number;
  post_text?: string;
  media_location?: string;
  is_shared?: boolean;
};

type PostUpdateDataType = {
  post_text?: string;
  media_location?: string;
};

export { PostCreateDataType, PostUpdateDataType };
