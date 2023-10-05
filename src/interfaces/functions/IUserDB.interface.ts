import IUserProfile from "../tables/user_profile.interface.ts";
import {
  UserRegisterType,
  UserUpdateType
} from "../../data-access/user/types.ts";

export default interface IUserDB {
  selectUserById: ({ userId }: { userId: number }) => Promise<IUserProfile>;

  selectAllUsers: ({
    page,
    pageSize
  }: {
    page: number;
    pageSize: number;
  }) => Promise<IUserProfile[]>;

  selectAllUserFriends: ({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }) => Promise<IUserProfile[]>;

  createUser: ({
    userInfo
  }: {
    userInfo: UserRegisterType;
  }) => Promise<IUserProfile>;

  updateUserById: ({
    userId,
    updateData
  }: {
    userId: number;
    updateData: UserUpdateType;
  }) => Promise<IUserProfile>;

  deleteUserById: ({ userId }: { userId: number }) => Promise<{}>;
}
