import userUseCase from "../../use-cases/user/index.ts";
import makeSelectUserByIdController from "./select-user-by-id.controller.ts";
import makeSelectAllUsersController from "./select-all-users.controller.ts";
import makeSelectAllUserFriendsController from "./select-all-user-friends.controller.ts";
import makeCreateUserController from "./create-user.controller.ts";
import makeUpdateUserController from "./update-user.controller.ts";
import makeDeleteUserController from "./delete-user.controller.ts";
import makeSelectAllRequestsController from "./select-all-requests.controller.ts";
import makeSendFriendRequestController from "./send-friend-request.controller.ts";
import makeAcceptFriendRequestController from "./accpet-friend-request.controller.ts";
import makeRejectFriendRequestController from "./reject-friend-request.controller.ts";
import makeDeleteFriendshipController from "./delete-friendship.controller.ts";

const selectUserByIdController = makeSelectUserByIdController({
  useCase: userUseCase.selectUserByIdUseCase
});
const selectAllUsersController = makeSelectAllUsersController({
  useCase: userUseCase.selectAllUsersUseCase
});
const selectAllUserFriendsController = makeSelectAllUserFriendsController({
  useCase: userUseCase.selectAllUserFriendsUseCase
});
const createUserController = makeCreateUserController({
  useCase: userUseCase.createUserUseCase
});
const updateUserController = makeUpdateUserController({
  useCase: userUseCase.updateUserUseCase
});
const deleteUserController = makeDeleteUserController({
  useCase: userUseCase.deleteUserUseCase
});
const selectAllRequestsController = makeSelectAllRequestsController({
  useCase: userUseCase.selectAllRequestsUseCase
});
const sendFriendRequestController = makeSendFriendRequestController({
  useCase: userUseCase.sendFriendRequestUseCase
});
const acceptFriendRequestController = makeAcceptFriendRequestController({
  useCase: userUseCase.acceptFriendRequestUseCase
});
const rejectFriendRequestController = makeRejectFriendRequestController({
  useCase: userUseCase.rejectFriendRequestUseCase
});
const deleteFriendshipController = makeDeleteFriendshipController({
  useCase: userUseCase.deleteFriendshipUseCase
});

const userController = Object.freeze({
  selectUserByIdController,
  selectAllUsersController,
  selectAllUserFriendsController,
  createUserController,
  updateUserController,
  deleteUserController,
  selectAllRequestsController,
  sendFriendRequestController,
  acceptFriendRequestController,
  rejectFriendRequestController,
  deleteFriendshipController
});

export default userController;
