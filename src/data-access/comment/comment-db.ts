import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import { CommentCreateDataType, CommentUpdateDataType } from "./types.ts";
import IPostComment from "../../interfaces/tables/post_comment.interface.ts";

export default function makeCommentDb({ db }: { db: typeof connection }) {
  async function createComment({
    commentCreateData
  }: {
    commentCreateData: CommentCreateDataType;
  }): Promise<IPostComment> {
    const sql = `
    INSERT INTO post_comment (profile_id, post_id, comment_text, created_at)
    VALUES (?, ?, ?, NOW());
    `;

    const { profile_id, post_id, comment_text } = commentCreateData;
    const [result] = await db.query(sql, [profile_id, post_id, comment_text]);

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
    createComment,
    updateComment,
    deleteComment,
    likeComment
  });
}
