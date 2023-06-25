export type IPost = {
  createdAt: string;
  likedBy: string[];
  owner: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  postBody: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
