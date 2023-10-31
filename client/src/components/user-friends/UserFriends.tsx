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
  //TODO: display 4 friends after adding it to backend response
  return (
    <>
      <section className="user-friends">
        <h4 className="user-friends__title">Friends</h4>
        {/* {(friends as EntityState<IUserBasicData>).ids.length > 0 ? (
          <>
            <ul className="users-friends__list">
              {(friends as EntityState<IUserBasicData>).ids.map(
                (friendId: EntityId) => (
                  <Friend key={friendId} friendId={friendId} />
                )
              )}
            </ul>
            {(friends as EntityState<IUserBasicData>).ids.length > 8 && (
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
        )} */}
        <button
          className="user-friends__see-more"
          onClick={() => dispatch(openModal("userFriendsModal"))}
        >
          See more...
        </button>
      </section>
      {modals["userFriendsModal"] && <UserFriendsModal />}
    </>
  );
};

export default UserFriends;
