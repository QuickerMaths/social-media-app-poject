// Internal dependencies

import Friend from "../friend/Friend";
import UserFriendsModal from "../../portals/user-friends-modal/UserFriendsModal";
import { IUser } from "../../pages/user-profile/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { openModal } from "../../features/modalSlice/modalSlice";
import { RootState } from "../../redux/store";

interface Props {
  user: IUser;
}

const UserFriends: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const { modals } = useAppSelector((state: RootState) => state.modal);

  const { friends } = user;
  console.log(user);
  return (
    <>
      <section className="user-friends">
        <h4 className="user-friends__title">Friends</h4>
        {friends ? (
          <>
            <ul className="users-friends__list">
              {friends.map((friend) => (
                <Friend key={friend.id} friend={friend} />
              ))}
            </ul>
            {friends.length > 9 && (
              <button
                className="user-friends__see-more"
                onClick={() => dispatch(openModal("userFriendsModal"))}
              >
                See more...
              </button>
            )}
          </>
        ) : (
          <p>No friends yet</p>
        )}
      </section>
      {modals["userFriendsModal"] && <UserFriendsModal />}
    </>
  );
};

export default UserFriends;
