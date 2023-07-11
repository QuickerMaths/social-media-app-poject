// Internal dependencies

import { IUser, IUserBasicData } from "../../pages/user-profile/types";
import Friend from "../friend/Friend";

interface Props {
  user: IUser;
}

const UserFriends: React.FC<Props> = ({ user }) => {
  const { friends } = user;
  return (
    <section className="user-friends">
      <h4 className="user-friends__title">Friends</h4>
      <ul className="user-friends__list">
        {friends.length > 0 ? (
          (friends as IUserBasicData[]).map((friend) => (
            <Friend key={friend._id} friend={friend} />
          ))
        ) : (
          <p>No friends yet</p>
        )}
      </ul>
    </section>
  );
};

export default UserFriends;
