import IUserProfile from "./user_profile.interface.ts";
import IFriendshipStatus from "./friendship_status.interface.ts";

export default interface IFriendship {
  id: number;
  profile_requester_id: Pick<IUserProfile, "id">;
  profile_responder_id: Pick<IUserProfile, "id">;
  status_id: Pick<IFriendshipStatus, "id">;
  createdAt: Date;
}
