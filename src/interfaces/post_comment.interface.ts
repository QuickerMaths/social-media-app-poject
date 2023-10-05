import IUserPost from "./user_post.interface.ts";
import IUserProfile from "./user_profile.interface.ts";
export default interface IPostComment {
  id: number;
  post_id: Pick<IUserPost, "id">;
  profile_id: Pick<IUserProfile, "id">;
  comment_text: string;
  createdAt: Date;
}
