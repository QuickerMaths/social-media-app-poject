export type IComment = {
  commentBody: string;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postId: string;
};
