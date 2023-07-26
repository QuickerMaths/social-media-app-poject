import { Request, Response } from "express";
import User from "../models/Users";

export const getFriendsByUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "User id is required" } });

  const usersFriends = await User.findById(userId)
    .select("friends")
    .populate([
      {
        path: "friends",
        select: "username _id profilePicture",
        model: "User",
      },
    ]);

  if (!usersFriends)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No friends found" } });

  return res.status(200).json({ status: "OK", data: usersFriends });
};

export const getFriendsRequests = async (req: Request, res: Response) => {
  const friendsRequests = await User.findById(req.params.id)
    .select("friendsRequests")
    .populate([
      {
        path: "friendsRequests",
        select: "username _id profilePicture",
        model: "User",
      },
    ]);

  if (!friendsRequests)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No friends requests found" } });

  return res.status(200).json({ status: "OK", data: friendsRequests });
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { userToAddId, userId } = req.body;

  if (!userToAddId || !userId)
    return res.status(400).json({
      status: "FAILED",
      data: { error: "User and user to add ids are required" },
    });

  const user = await User.findById(userId);

  if (!user)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No user found" } });

  const userToAdd = await User.findById(userToAddId);

  if (!userToAdd)
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });

  if (
    userToAdd.friendsRequests.includes(userId as any) ||
    user.friendsRequests.includes(userToAddId as any)
  )
    return res.status(400).json({
      status: "FAILED",
      data: { error: "Friend request already send to this user" },
    });

  if (
    userToAdd.friends.includes(userId as any) ||
    user.friends.includes(userToAddId as any)
  )
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "Friend already added" } });

  await userToAdd.updateOne({ $push: { friendsRequests: userId } }).exec();

  return res.status(200).json({ status: "OK", data: userToAdd });
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { userId, userToAddId } = req.body;

  if (!userToAddId || !userId)
    return res.status(400).json({
      status: "FAILED",
      data: { error: "User and user to add ids are required" },
    });

  const user = await User.findById(userId);

  if (!user)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No user found" } });

  const userToAdd = await User.findById(userToAddId);

  if (!userToAdd)
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });

  if (user.friendsRequests.includes(userToAddId)) {
    await userToAdd
      .updateOne({
        $push: { friends: userId },
      })
      .exec();
    await user
      .updateOne({
        $pull: { friendsRequests: userToAddId },
        $push: { friends: userToAddId },
      })
      .exec();
  } else {
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });
  }

  return res.status(200).json({ status: "FAILED", data: user });
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const { userId, userToAddId } = req.body;

  if (!userToAddId || !userId)
    return res.status(400).json({
      status: "FAILED",
      data: { error: "User and user to add ids are required" },
    });

  const user = await User.findById(userId);

  if (!user)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No user found" } });

  const userToAdd = await User.findById(userToAddId);

  if (!userToAdd)
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });

  if (user.friendsRequests.includes(userToAddId)) {
    await user
      .updateOne({
        $pull: { friendsRequests: userToAddId },
      })
      .exec();
  } else {
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });
  }

  return res.status(200).json({ status: "OK", data: user });
};

export const deleteFromFriendsList = async (req: Request, res: Response) => {
  const { friendToDeleteId, userId } = req.body;

  if (!friendToDeleteId || !userId)
    return res
      .status(400)
      .json({
        status: "FAILED",
        data: { error: "User and user to add ids are required" },
      });

  const user = await User.findById(userId);

  if (!user)
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "No user found" } });

  const friendToDelete = await User.findById(friendToDeleteId);

  if (!friendToDelete)
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });

  if (user.friends.includes(friendToDeleteId)) {
    await user.updateOne({ $pull: { friends: friendToDeleteId } }).exec();
    await friendToDelete.updateOne({ $pull: { friends: userId } }).exec();
  } else {
    return res
      .status(500)
      .json({ status: "FAILED", data: { error: "Server Internal Error" } });
  }

  return res.status(204).json({ status: "OK", data: friendToDelete });
};
