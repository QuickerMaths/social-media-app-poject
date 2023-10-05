import db from "../../../db/db.ts";
import IUserProfile from "../../interfaces/user_profile.interface.ts";

export default function makeUserDB({ makeDb }: { makeDb: typeof db }) {
  async function getUserById({
    userId
  }: {
    userId: number;
  }): Promise<IUserProfile> {
    const sql = "SELECT * FROM user_profile WHERE id = ?";

    const [result] = await makeDb.query(sql, [userId]);

    return (result as IUserProfile[])[0];
  }

  return Object.freeze({
    getUserById
  });
}
