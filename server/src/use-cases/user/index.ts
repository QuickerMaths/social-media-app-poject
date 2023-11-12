import userDB from "../../data-access/user/index.ts";
import makeSelectUserByIdUseCase from "./select-user-by-id.use-case.ts";
import makeSelectAllUsersUseCase from "./select-all-users.use-case.ts";
import makeSelectAllUserFriendsUseCase from "./select-all-user-friends.use-case.ts";
import makeCreateUserUseCase from "./create-user.use-case.ts";
import makeUpdateUserUseCase from "./update-user.use-case.ts";
import makeDeleteUserUseCase from "./delete-user.use-case.ts";
import makeSelectAllRequestsUseCase from "./select-all-requests.use-case.ts";
import authService from "../../services/auth/index.ts";

const selectUserByIdUseCase = makeSelectUserByIdUseCase({
  userDataBase: userDB
});
const selectAllUsersUseCase = makeSelectAllUsersUseCase({
  userDataBase: userDB
});
const selectAllUserFriendsUseCase = makeSelectAllUserFriendsUseCase({
  userDataBase: userDB
});
const createUserUseCase = makeCreateUserUseCase({
  userDataBase: userDB,
  hash: authService.hash
});
const updateUserUseCase = makeUpdateUserUseCase({ userDataBase: userDB });
const deleteUserUseCase = makeDeleteUserUseCase({ userDataBase: userDB });
const selectAllRequestsUseCase = makeSelectAllRequestsUseCase({
  userDataBase: userDB
});

const userUseCase = Object.freeze({
  selectUserByIdUseCase,
  selectAllUsersUseCase,
  selectAllUserFriendsUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  selectAllRequestsUseCase
});

export default userUseCase;
