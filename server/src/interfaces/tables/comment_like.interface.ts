import IPostComment from "./post_comment.interface.ts";
import IUserProfile from "./user_profile.interface.ts";
export default interface ICommentLike {
  id: number;
  comment_id: Pick<IPostComment, "id">;
  profile_id: Pick<IUserProfile, "id">;
  createdAt: Date;
}
