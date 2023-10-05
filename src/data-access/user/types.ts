import IUserProfile from "../../interfaces/tables/user_profile.interface.ts";

type UserRegisterType = Pick<IUserProfile, "username" | "email" | "password">;
type UserUpdateType = Partial<
  Omit<
    IUserProfile,
    "id" | "is_email_confirmation" | "email" | "password" | "createdAt"
  >
>;

export { UserRegisterType, UserUpdateType };
