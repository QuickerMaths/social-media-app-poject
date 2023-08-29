import mongoose from "mongoose";

export default function makeUserDb({ UserSchema }) {
  return Object.freeze({
    getAll,
  });

  async function getAll() {
    try {
      const users = await UserSchema.find().exec();

      return users;
    } catch (err) {
      console.log(err);
    }
  }
}
