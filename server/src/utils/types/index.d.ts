import IUserProfile from "../../interfaces/tables/user_profile.interface.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: Pick<IUserProfile, "id" | "username" | "avatar_url">;
  }
}
