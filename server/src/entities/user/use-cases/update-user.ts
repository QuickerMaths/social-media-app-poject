import { ObjectId } from "mongoose";
import { IUserAddressData } from "../types";

export default function makeUpdateUser({ userDb }) {
  return async function updateComment({
    _id,
    userData,
  }: {
    _id: ObjectId;
    userData: IUserAddressData;
  }) {
    const existing = userDb.findById(_id);

    if (!existing) {
      throw new Error("User does not exist");
    }

    const updated = userDb.updateAddress({ _id, userData });

    return updated;
  };
}
