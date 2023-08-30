import { ObjectId } from "mongodb";

export type IUserAddressData = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type IUser = {
  username: any;
  email: any;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  friends: ObjectId[];
  friendsRequests: ObjectId[];
  address: IUserAddressData;
  refreshToken: string;
};
