export type IUser = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  friends: string[] | IUserBasicData[];
  friendsRequests: string[] | IUserBasicData[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
};

export type IUserBasicData = {
  _id: string;
  username: string;
  profilePicture: string | null;
};
