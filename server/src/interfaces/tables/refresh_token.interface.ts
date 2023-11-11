import IUserProfile from "./user_profile.interface.ts";

export default interface IRefreshToken {
  token: string;
  profile_id: Pick<IUserProfile, "id">;
  created_at: Date;
}
