import { ObjectId } from "mongoose";
import { IUserAddressData } from "../types";
import User from "../user";

//TODO: check

function makeUserDb({ UserSchema }: { UserSchema: typeof User }) {
  return Object.freeze({
    getAll,
    findById,
    remove,
    updateAddress,
    uploadUserImage,
  });

  async function getAll() {
    try {
      const users = await UserSchema.find().exec();

      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async function findById({ _id }: { _id: ObjectId }) {
    try {
      const user = await UserSchema.findById({ _id }).populate([
        {
          path: "friends",
          select: "username _id profilePicture",
          model: "User",
          options: {
            limit: 8,
            sort: { _id: -1 },
          },
        },
      ]);

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async function remove({ _id }: { _id: ObjectId }) {
    try {
      const result = await UserSchema.findByIdAndDelete(_id);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateAddress({
    _id,
    userData,
  }: {
    _id: ObjectId;
    userData: IUserAddressData;
  }) {
    try {
      const result = await UserSchema.findByIdAndUpdate(_id, {
        address: { ...userData },
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async function uploadUserImage({
    _id,
    path,
  }: {
    _id: ObjectId;
    path: string;
  }) {
    try {
      const result = await UserSchema.findByIdAndUpdate(_id, {
        profilePicture: path,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

const userDb = makeUserDb({ User });
