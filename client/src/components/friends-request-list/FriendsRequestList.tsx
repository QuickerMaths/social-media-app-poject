import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IUserBasicData } from "../../pages/user-profile/types";
import { RootState } from "../../redux/store";
import FriendsRequest from "../friends-request/FriendsRequest";
import { AiOutlineLeft } from "react-icons/ai";
import { closeModal } from "../../features/modalSlice/modalSlice";

interface Props {}

const FriendsRequestList: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { userId, friendsRequests: requestsCount } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [friendsRequests, setFriendsRequests] = useState<IUserBasicData[]>([]);
  const [reRender, setReRender] = useState<boolean>(false);

  //TODO: refactor to rtkQuery
  useEffect(() => {
    const getFriendsRequests = async (userId: string) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/friends/requests/${userId}`
        );

        setFriendsRequests(res.data.friendsRequests);
      } catch (err) {
        console.log(err);
      }
    };

    getFriendsRequests(userId as string);
  }, [reRender]);

  if (!friendsRequests) return <p>Loading...</p>;

  //TODO: figure out how to add smooth animation
  return (
    <section className="friends-request-list">
      <button
        className="friends-request-list__back-button"
        onClick={() => dispatch(closeModal("friends-request-list"))}
      >
        <AiOutlineLeft className="friends-request-list__back-icon" />
      </button>
      <ul className="friends-request-list__list">
        {requestsCount.length > 0 ? (
          friendsRequests.map((request: IUserBasicData) => (
            <FriendsRequest
              key={request._id}
              request={request}
              setReRender={setReRender}
              reRender={reRender}
            />
          ))
        ) : (
          <p className="friends-request-list__empty-list-message">
            No friends requests
          </p>
        )}
      </ul>
    </section>
  );
};

export default FriendsRequestList;
