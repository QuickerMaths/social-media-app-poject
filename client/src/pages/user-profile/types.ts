import { EntityState } from "@reduxjs/toolkit";

export type IUser = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  friends: IUserBasicData[] | EntityState<IUserBasicData>;
  friendsRequests: IUserBasicData[];
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

export type IUserBasicData = Pick<IUser, "_id" | "username" | "profilePicture">;
