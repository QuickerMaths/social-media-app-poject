import IUserProfile from "./user_profile.interface.ts";

export default interface IUserPost {
  id: number;
  profile_id: Pick<IUserProfile, "id">;
  shared_post_id: Pick<IUserPost, "id"> | null;
  post_text?: string | null;
  media_location?: string | null;
  shared_post_text?: string | null;
  shared_media_location?: string | null;
  share_count: number;
  comment_count: number;
  is_shared: boolean;
  createdAt: Date;
}

//TODO: write some code that will be responsible for handling share_count and comment_count
