import IPostComment from "../../interfaces/tables/post_comment.interface.ts";
import IUserPost from "../../interfaces/tables/user_post.interface.ts";

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

type PostWithCommentsType = {
  post: IUserPost;
  comments: IPostComment[] | [];
};

export { PostCreateDataType, PostUpdateDataType, PostWithCommentsType };
