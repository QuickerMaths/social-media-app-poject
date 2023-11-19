export interface IPaginationSliceState {
  postPage: number;
  userPostPage: Record<number, number>;
  commentPage: Record<number, number>;
  friendRequestPage: number;
}
