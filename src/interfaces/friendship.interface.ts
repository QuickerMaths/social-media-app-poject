export default interface IFriendship {
  id: number;
  profile_requester_id: number;
  profile_responder_id: number;
  status_id: number;
  createdAt: Date;
}
