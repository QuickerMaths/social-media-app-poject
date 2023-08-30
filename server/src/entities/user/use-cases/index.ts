import makeUserDb from "../data-access/user-db";
import makeUpdateUser from "./update-user";

const updateUser = makeUpdateUser({ makeUserDb });

const userService = Object.freeze({
  updateUser,
});

export default userService;
export { updateUser };
