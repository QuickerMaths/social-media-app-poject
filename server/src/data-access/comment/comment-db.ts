import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import { CommentCreateDataType, CommentUpdateDataType } from "./types.ts";
import IPostComment from "../../interfaces/tables/post_comment.interface.ts";

export default function makeCommentDb({ db }: { db: typeof connection }) {
  async function selectCommentsByPostId({
    postId,
    loggedInUserId,
    page,
    pageSize
  }: {
    postId: number;
    loggedInUserId?: number;
    page: number;
    pageSize: number;
  }): Promise<IPostComment[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // this query is fetching all comments from database
    // if userId is provided, it will also fetch the is_liked column to indicate if the comment is liked by the user
    // the is_liked filed is set to true when created_at is not null, otherwise it is set to null

    const [comments] = await db.query(
      `
      WITH CTE AS (
        SELECT DISTINCT
          pc.*,
          json_object('id', up.id, 'username', up.username, 'avatar_url', up.avatar_url) AS comment_owner
          ${
            loggedInUserId
              ? ",CASE WHEN cl.profile_id = ? AND cl.created_at IS NOT NULL THEN 1 END AS is_liked"
              : ""
          } 
          FROM post_comment pc
          ${
            loggedInUserId
              ? "LEFT JOIN comment_like cl ON pc.id = cl.comment_id"
              : ""
          }
          LEFT JOIN user_profile up ON pc.profile_id = up.id
          WHERE pc.post_id = ?
      )
      ${
        loggedInUserId
          ? `
      SELECT *
        FROM (
          SELECT *,
          ROW_NUMBER() OVER (PARTITION BY id ORDER BY is_liked DESC) AS rn
          FROM CTE
        ) AS Ranked
        WHERE rn = 1 
        ORDER BY created_at DESC`
          : `
          SELECT * 
            FROM CTE 
            ORDER BY created_at DESC`
      }
      LIMIT ?
      OFFSET ?;
      `,
      loggedInUserId
        ? [loggedInUserId, postId, limit, offset]
        : [postId, limit, offset]
    );

    return comments as IPostComment[];
  }

  async function createComment({
    userId,
    commentCreateData
  }: {
    userId: number;
    commentCreateData: CommentCreateDataType;
  }): Promise<IPostComment> {
    const sql = `
    INSERT INTO post_comment (profile_id, post_id, comment_text, created_at)
    VALUES (?, ?, ?, NOW());
    `;

    const { post_id, comment_text } = commentCreateData;
    const [result] = await db.query(sql, [userId, post_id, comment_text]);

    const [commentRecord] = await db.query(
      "SELECT * FROM post_comment WHERE id = ?",
      [(result as ResultSetHeader).insertId]
    );

    return (commentRecord as IPostComment[])[0];
  }

  async function updateComment({
    commentId,
    commentUpdateData
  }: {
    commentId: number;
    commentUpdateData: CommentUpdateDataType;
  }): Promise<IPostComment> {
    const sql = `
    UPDATE post_comment
      SET ?
      WHERE id = ?
    `;

    await db.query(sql, [{ ...commentUpdateData }, commentId]);

    const [commentRecord] = await db.query(
      "SELECT * FROM post_comment WHERE id = ?",
      [commentId]
    );

    return (commentRecord as IPostComment[])[0];
  }

  async function deleteComment({
    commentId
  }: {
    commentId: number;
  }): Promise<{}> {
    const sql = `
    DELETE FROM post_comment
      WHERE id = ?
    `;

    await db.query(sql, [commentId]);

    return {};
  }

  async function likeComment({
    commentId,
    userId
  }: {
    commentId: number;
    userId: number;
  }): Promise<IPostComment> {
    // this query is inserting a new record into comment_like table
    // if the record already exists, it will update the created_at column to null to unlike the comment

    const sql = `
    INSERT INTO comment_like (comment_id, profile_id, created_at)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE created_at = IF(created_at IS NULL, NOW(), NULL);
    `;

    await db.query(sql, [commentId, userId]);

    const [commentRecord] = await db.query(
      "SELECT * FROM post_comment WHERE id = ?",
      [commentId]
    );

    return (commentRecord as IPostComment[])[0];
  }

  return Object.freeze({
    selectCommentsByPostId,
    createComment,
    updateComment,
    deleteComment,
    likeComment
  });
}
