// Internal dependencies

import React from "react";

// External dependencies

import { useGetAllUsersQuery } from "../../features/apiSlice/userApiSlice/userApiSlice";

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{isError}</div>;
  } else {
    content = <h2>Users List</h2>;
  }

  console.log(users);

  return <section className="users-list">{content}</section>;
};

export default UsersList;
