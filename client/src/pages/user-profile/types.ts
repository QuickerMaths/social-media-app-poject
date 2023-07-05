export type IUser = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  friends: string[] | [] | IUser[];
  friendsRequests: string[] | [] | IUser[];
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
