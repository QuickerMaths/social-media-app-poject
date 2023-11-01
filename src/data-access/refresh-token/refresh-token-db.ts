import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import IRefreshToken from "../../interfaces/tables/refresh_token.interface.ts";

export default function makeRefreshTokenDb({ db }: { db: typeof connection }) {
  async function selectRefreshTokenByUserId({
    userId
  }: {
    userId: number;
  }): Promise<IRefreshToken> {
    const sql = "SELECT * FROM refresh_token WHERE profile_id = ?;";

    const [result] = await db.query(sql, [userId]);

    return (result as IRefreshToken[])[0];
  }

  async function createRefreshToken({
    token,
    userId
  }: {
    token: string;
    userId: number;
  }): Promise<IRefreshToken> {
    const sql =
      "INSERT INTO refresh_token (token, profile_id, created_at) VALUES (?, ?, NOW());";

    const [result] = await db.query(sql, [token, userId]);

    const [refreshTokenRecord] = await db.query(
      "SELECT * FROM refresh_token WHERE id = ?;",
      [(result as ResultSetHeader).insertId]
    );

    return (refreshTokenRecord as IRefreshToken[])[0];
  }

  async function deleteRefreshToken({
    userId
  }: {
    userId: number;
  }): Promise<{}> {
    const sql = "DELETE FROM refresh_token WHERE profile_id = ?;";

    await db.query(sql, [userId]);

    return {};
  }

  return Object.freeze({
    selectRefreshTokenByUserId,
    createRefreshToken,
    deleteRefreshToken
  });
}
