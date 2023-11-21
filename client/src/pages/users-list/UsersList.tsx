// External dependencies

import User from "../../components/user/User";
import QueryError from "../../utilities/error/QueryError";
import useLastRef from "../../hooks/useLastRef";
import {
  useGetAllUsersQuery,
  userAdapter,
} from "../../features/apiSlice/userApiSlice/userApiSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { setUserPage } from "../../features/paginationSlice/paginationSlice";

const UsersList = () => {
  const { userPage } = useAppSelector((state: RootState) => state.pagination);
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery(
    { page: userPage },
    {
      selectFromResult: ({
        data,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }) => ({
        data: {
          users: userAdapter
            .getSelectors()
            .selectAll(data ?? userAdapter.getInitialState()),
          meta: data?.meta,
        },
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      }),
    }
  );

  const lastUserRef = useLastRef({
    isLoading,
    isFetching,
    page: userPage,
    actionToDispatch: setUserPage,
    hasNextPage: users.meta?.hasNextPage as boolean,
  });

  let content;

  if (isError) {
    content = <QueryError error={error as string} refetch={refetch} />;
  } else if (isSuccess) {
    content = (
      <>
        <h2 className="users-list__title">Users List</h2>
        <ul className="users-list__list">
          {users.users.map((user, index) => {
            if (users.users.length === index + 1) {
              return <User ref={lastUserRef} key={user.id} user={user} />;
            }
            return <User key={user.id} user={user} />;
          })}
        </ul>
        {isLoading || (isFetching && <p>Loading...</p>)}
      </>
    );
  }

  return <section className="users-list">{content}</section>;
};

export default UsersList;
