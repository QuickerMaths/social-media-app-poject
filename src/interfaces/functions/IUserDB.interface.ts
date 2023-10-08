import IUserProfile from "../tables/user_profile.interface.ts";
import {
  UserCreateDataType,
  UserUpdateDataType
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
    userCreateData
  }: {
    userCreateData: UserCreateDataType;
  }) => Promise<IUserProfile>;

  updateUserById: ({
    userId,
    userUpdateData
  }: {
    userId: number;
    userUpdateData: UserUpdateDataType;
  }) => Promise<IUserProfile>;

  deleteUserById: ({ userId }: { userId: number }) => Promise<{}>;
}
