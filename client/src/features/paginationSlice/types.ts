export interface IPaginationSliceState {
  userPostPage: Record<number, number>;
  commentPage: Record<number, number>;
  userFriendsPage: Record<number, number>;
  postPage: number;
  userPage: number;
  friendRequestPage: number;
}
