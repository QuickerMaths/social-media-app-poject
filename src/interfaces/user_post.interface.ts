export default interface IUserPost {
  id: number;
  profile_id: number;
  shared_post_id: number | null;
  post_text?: string;
  media_location?: string;
  share_count: number;
  comment_count: number;
  is_shared: boolean;
  createdAt: Date;
}
