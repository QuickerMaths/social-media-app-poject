// External dependencies

import User from "../../components/user/User";
import { useGetAllUsersQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserBasicData } from "../../pages/user-profile/types";

const UsersList = () => {
  const { data: users, isLoading, isError, isSuccess } = useGetAllUsersQuery();

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{isError}</div>;
  } else if (isSuccess) {
    content = (
      <>
        <h2 className="users-list__title">Users List</h2>
        <ul className="users-list__list">
          {users?.map((user: IUserBasicData) => (
            <User key={user._id} user={user} />
          ))}
        </ul>
      </>
    );
  }

  console.log(users);

  return <section className="users-list">{content}</section>;
};

export default UsersList;
