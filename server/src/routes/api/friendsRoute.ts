import express from "express";
const router = express.Router();
import {
  getFriendsByUser,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFromFriendsList,
  getFriendsRequests,
} from "../../controllers/friendsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router
  .route("/")
  .get(getFriendsByUser)
  .put(sendFriendRequest)
  .delete(deleteFromFriendsList);

router.route("/accept").put(acceptFriendRequest);

router.route("/reject").put(rejectFriendRequest);

router.route("/requests/:id").get(getFriendsRequests);

export default router;
