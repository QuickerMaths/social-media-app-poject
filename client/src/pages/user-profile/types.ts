export type IUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  friends: string[] | [];
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
