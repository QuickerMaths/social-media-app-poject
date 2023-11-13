import IUserProfile from "../../interfaces/tables/user_profile.interface.ts";

type UserCreateDataType = Pick<IUserProfile, "username" | "email" | "password">;
type UserUpdateDataType = Partial<
  Omit<
    IUserProfile,
    "id" | "is_email_confirmation" | "email" | "password" | "createdAt"
  >
>;
type UserRequestDataType = Pick<IUserProfile, "id" | "username" | "avatar_url">;

export { UserCreateDataType, UserUpdateDataType, UserRequestDataType };
