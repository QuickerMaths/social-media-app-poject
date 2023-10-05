export default interface IPostComment {
  id: number;
  post_id: number;
  profile_id: number;
  comment_text: string;
  createdAt: Date;
}
