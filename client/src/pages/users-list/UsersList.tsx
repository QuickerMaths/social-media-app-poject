// External dependencies

import User from "../../components/user/User";
import QueryError from "../../utilities/error/QueryError";
import Spinner from "../../utilities/spinner/Spinner";
import { useGetAllUsersQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";
import { IUserPartial } from "../../pages/user-profile/types";

const UsersList = () => {
  //TODO: user pagination
  const page = 1;
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery({ page });

  let content;

  if (isLoading || isFetching) {
    content = <Spinner size={125} />;
  } else if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        <h2 className="users-list__title">Users List</h2>
        <ul className="users-list__list">
          {users?.map((user: IUserPartial) => (
            <User key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  }

  return <section className="users-list">{content}</section>;
};

export default UsersList;
