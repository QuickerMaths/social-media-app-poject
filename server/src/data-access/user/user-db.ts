import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import IUserProfile from "../../interfaces/tables/user_profile.interface.ts";
import {
  UserCreateDataType,
  UserUpdateDataType,
  UserRequestDataType
} from "./types.ts";

export default function makeUserDB({ db }: { db: typeof connection }) {
  //TODO: when user is logged in, query should also return friendship status of both selected and logged in user
  //TODO: should also return 4 friends of selected user to display on profile page
  async function selectUserById({
    userId,
    loggedInUserId
  }: {
    userId: number;
    loggedInUserId?: number;
  }): Promise<IUserProfile> {
    const sql = `
    WITH CTE AS (
      SELECT
          up.id AS user_id,
          fp.id AS friend_id, 
          fp.username AS friend_username, 
          fp.avatar_url AS friend_avatar_url
      FROM user_profile up
      JOIN friendship f ON up.id = f.profile_request_id OR up.id = f.profile_responder_id
      JOIN user_profile fp ON fp.id = 
          CASE
              WHEN up.id = f.profile_request_id THEN f.profile_responder_id
              WHEN up.id = f.profile_responder_id THEN f.profile_request_id
          END
      WHERE up.id = ? AND f.status_id = 1
      LIMIT 10
    )
    SELECT DISTINCT
      up.*,
      (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', friend_id,
                'username', friend_username,
                'avatar_url', friend_avatar_url
            )
        )
        FROM CTE AS sub
        WHERE sub.user_id = up.id
      ) AS friends
      ${
        loggedInUserId
          ? `,
      MAX(CASE WHEN f.profile_request_id = ? OR f.profile_responder_id = ? THEN f.status_id END) AS friendship_status`
          : ""
      }
    FROM user_profile up
      LEFT JOIN CTE ON up.id = CTE.user_id
      LEFT JOIN friendship f ON up.id = f.profile_request_id OR up.id = f.profile_responder_id
    WHERE up.id = ?;
    `;

    const [result] = await db.query(
      sql,
      loggedInUserId
        ? [userId, loggedInUserId, loggedInUserId, userId]
        : [userId, userId]
    );

    return (result as IUserProfile[])[0];
  }

  async function selectUserAvatarAndUsernameById({
    userId
  }: {
    userId: number;
  }): Promise<Pick<IUserProfile, "id" | "username" | "avatar_url">> {
    const sql =
      "SELECT id, username, avatar_url FROM user_profile WHERE id = ?";

    const [result] = await db.query(sql, [userId]);

    return (result as IUserProfile[])[0];
  }

  async function selectUserByEmail({ email }: { email: string }) {
    const sql = "SELECT * FROM user_profile WHERE email = ?";

    const [result] = await db.query(sql, [email]);

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
    SELECT id, username, avatar_url, first_name, last_name
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
    SELECT 
      user_profile.id,
      user_profile.username,
      user_profile.avatar_url,
      user_profile.first_name,
      user_profile.last_name
        FROM user_profile 
        INNER JOIN friendship ON user_profile.id = friendship.profile_responder_id
        WHERE friendship.profile_request_id = ? AND friendship.status_id = 1
      UNION
    SELECT 
      user_profile.id,
      user_profile.username,
      user_profile.avatar_url,
      user_profile.first_name,
      user_profile.last_name
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
    userCreateData
  }: {
    userCreateData: UserCreateDataType;
  }): Promise<IUserProfile> {
    const sql = `
    INSERT INTO user_profile (username, email, password, created_at)
      VALUES (?, ? , ?, NOW());
    `;

    const { username, email, password } = userCreateData;
    const [result] = await db.query(sql, [username, email, password]);

    const [userRecord] = await db.query(
      "SELECT * FROM user_profile WHERE id = ?",
      [(result as ResultSetHeader).insertId]
    );

    return (userRecord as IUserProfile[])[0];
  }

  async function updateUser({
    userId,
    userUpdateData
  }: {
    userId: number;
    userUpdateData: UserUpdateDataType;
  }): Promise<IUserProfile> {
    const sql = `
    UPDATE user_profile
      SET ?
      WHERE id = ?
    `;

    await db.query(sql, [{ ...userUpdateData }, userId]);

    const [userRecord] = await db.query(
      "SELECT * FROM user_profile WHERE id = ?",
      [userId]
    );

    return (userRecord as IUserProfile[])[0];
  }

  async function deleteUser({ userId }: { userId: number }): Promise<{}> {
    const sql = `
    DELETE FROM user_profile
      WHERE id = ?
    `;

    await db.query(sql, [userId]);

    return {};
  }

  async function selectAllUserRequests({ userId }: { userId: number }) {
    const sql = `
    (SELECT up.id, up.username, up.avatar_url 
      FROM friendship f
        JOIN user_profile up ON up.id = f.profile_request_id
      WHERE f.profile_responder_id = 301 AND f.status_id = 2)
      
        UNION
      
    (SELECT up.id, up.username, up.avatar_url
      FROM friendship f
        JOIN user_profile up ON up.id = f.profile_responder_id
      WHERE f.profile_request_id = 301 AND f.status_id = 2)
    `;

    const [result] = await db.query(sql, [userId, userId]);

    return result as IUserProfile[];
  }

  async function sendFriendRequest({
    loggedInUserId,
    responderId
  }: {
    loggedInUserId: number;
    responderId: number;
  }) {
    const sql = `
    INSERT INTO friendship (profile_request_id, profile_responder_id, status_id, created_at)
      VALUES (?, ?, 2, NOW())
    `;

    const [result] = await db.query(sql, [loggedInUserId, responderId]);

    const [record] = await db.query("SELECT * FROM friendship WHERE id = ?", [
      (result as ResultSetHeader).insertId
    ]);

    return (record as UserRequestDataType[])[0];
  }

  return Object.freeze({
    selectUserById,
    selectUserByEmail,
    selectUserAvatarAndUsernameById,
    selectAllUsers,
    selectAllUserFriends,
    createUser,
    updateUser,
    deleteUser,
    selectAllUserRequests,
    sendFriendRequest
  });
}
