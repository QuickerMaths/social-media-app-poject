import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import IUserProfile from "../../interfaces/tables/user_profile.interface.ts";
import IUserDB from "../../interfaces/functions/IUserDB.interface.ts";
import { UserRegisterType, UserUpdateType } from "./types.ts";

export default function makeUserDB({
  db
}: {
  db: typeof connection;
}): Readonly<IUserDB> {
  async function selectUserById({
    userId
  }: {
    userId: number;
  }): Promise<IUserProfile> {
    const sql = "SELECT * FROM user_profile WHERE id = ?";

    const [result] = await db.query(sql, [userId]);

    return (result as IUserProfile[])[0];
  }

  async function selectAllUsers({
    page,
    pageSize
  }: {
    page: number;
    pageSize: number;
  }): Promise<IUserProfile[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const sql = `
    SELECT * 
      FROM user_profile
      LIMIT ?
      OFFSET ?
    `;

    const [result] = await db.query(sql, [limit, offset]);

    return result as IUserProfile[];
  }

  async function selectAllUserFriends({
    userId,
    page,
    pageSize
  }: {
    userId: number;
    page: number;
    pageSize: number;
  }): Promise<IUserProfile[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const sql = `
    SELECT user_profile.id
        FROM user_profile 
        INNER JOIN friendship ON user_profile.id = friendship.profile_responder_id
        WHERE friendship.profile_request_id = ? AND friendship.status_id = 1
      UNION
    SELECT user_profile.id
        FROM user_profile 
        INNER JOIN friendship ON user_profile.id = friendship.profile_request_id
        WHERE friendship.profile_responder_id = ? AND friendship.status_id = 1
      LIMIT ?
      OFFSET ?
  `;

    const [result] = await db.query(sql, [userId, userId, limit, offset]);

    return result as IUserProfile[];
  }

  async function createUser({
    userInfo
  }: {
    userInfo: UserRegisterType;
  }): Promise<IUserProfile> {
    const sql = `
    INSERT INTO user_profile (username, email, password, created_at)
      VALUES (?, ? , ?, NOW());
    `;

    const { username, email, password } = userInfo;
    const [result] = await db.query(sql, [username, email, password]);

    const [userRecord] = await db.query(
      "SELECT * FROM user_profile WHERE id = ?",
      [(result as ResultSetHeader).insertId]
    );

    return (userRecord as IUserProfile[])[0];
  }

  async function updateUserById({
    userId,
    updateData
  }: {
    userId: number;
    updateData: UserUpdateType;
  }): Promise<IUserProfile> {
    const sql = `
    UPDATE user_profile
      SET ?
      WHERE id = ?
    `;

    await db.query(sql, [{ ...updateData }, userId]);

    const [userRecord] = await db.query(
      "SELECT * FROM user_profile WHERE id = ?",
      [userId]
    );

    return (userRecord as IUserProfile[])[0];
  }

  async function deleteUserById({ userId }: { userId: number }): Promise<{}> {
    const sql = `
    DELETE FROM user_profile
      WHERE id = ?
    `;

    await db.query(sql, [userId]);

    return {};
  }

  return Object.freeze({
    selectUserById,
    selectAllUsers,
    selectAllUserFriends,
    createUser,
    updateUserById,
    deleteUserById
  });
}
