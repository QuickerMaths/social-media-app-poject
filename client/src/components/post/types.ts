export type IPost = {
  createdAt: string;
  likes: number;
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
