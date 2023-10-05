import IUserProfile from "./user_profile.interface.ts";

export default interface IUserPost {
  id: number;
  profile_id: Pick<IUserProfile, "id">;
  shared_post_id: Pick<IUserPost, "id"> | null;
  post_text?: string;
  media_location?: string;
  share_count: number;
  comment_count: number;
  is_shared: boolean;
  createdAt: Date;
}
