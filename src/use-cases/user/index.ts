import userDB from "../../data-access/user/index.ts";
import makeSelectUserByIdUseCase from "./select-user-by-id.use-case.ts";
import makeSelectAllUsersUseCase from "./select-all-users.use-case.ts";
import makeSelectAllUserFriendsUseCase from "./select-all-user-friends.use-case.ts";
import makeCreateUserUseCase from "./create-user.use-case.ts";
import makeUpdateUserUseCase from "./update-user.use-case.ts";
import makeDeleteUserUseCase from "./delete-user.use-case.ts";

const selectUserByIdUseCase = makeSelectUserByIdUseCase({ user: userDB });
const selectAllUsersUseCase = makeSelectAllUsersUseCase({ user: userDB });
const selectAllUserFriendsUseCase = makeSelectAllUserFriendsUseCase({
  user: userDB
});
const createUserUseCase = makeCreateUserUseCase({ user: userDB });
const updateUserUseCase = makeUpdateUserUseCase({ user: userDB });
const deleteUserUseCase = makeDeleteUserUseCase({ user: userDB });

const userUseCase = Object.freeze({
  selectUserByIdUseCase,
  selectAllUsersUseCase,
  selectAllUserFriendsUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase
});

export default userUseCase;
