import { ResultSetHeader } from "mysql2/promise";
import connection from "../../../db/db.ts";
import IUserPost from "../../interfaces/tables/user_post.interface.ts";
import { PostCreateDataType, PostUpdateDataType } from "./types.ts";

export default function makePostDb({ db }: { db: typeof connection }) {
  async function selectAllPosts({
    page,
    pageSize,
    loggedInUserId
  }: {
    page: number;
    pageSize: number;
    loggedInUserId?: number;
  }): Promise<IUserPost[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // this query is fetching all posts from database
    // if is_shared is true, it will also fetch the shared_post_text and shared_media_location columns from the shared post that is defined by shared_post_id
    // if userId is provided, it will also fetch the is_liked column to indicate if the post is liked by the user
    // the is_liked filed is set to true when created_at is not null, otherwise it is set to null

    const sql = `  
      WITH CTE AS (
        SELECT DISTINCT
          up.*,
          json_object(
            'id', upr.id,
            'username', upr.username,
             'avatar_url', upr.avatar_url
          ) AS post_owner,
          CASE
          WHEN up.is_shared = 1 THEN JSON_OBJECT(
              'post_owner', JSON_OBJECT('id', spr.id, 'username', spr.username, 'avatar_url', spr.avatar_url),
              'post_text', sp.post_text,
              'media_location', sp.media_location,
              'created_at', sp.created_at
          )
          ELSE NULL 
          END AS shared_post
          ${
            loggedInUserId
              ? ",CASE WHEN pl.profile_id = ? AND pl.created_at IS NOT NULL THEN 1 END AS is_liked"
              : ""
          }
        FROM user_post up
        LEFT JOIN user_post sp ON up.shared_post_id = sp.id
        LEFT JOIN user_profile upr ON upr.id = up.profile_id
        LEFT JOIN user_profile spr ON sp.profile_id = spr.id
        ${loggedInUserId ? "LEFT JOIN post_like pl ON up.id = pl.post_id" : ""}
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
        WHERE rn = 1`
          : `SELECT * FROM CTE`
      }
      LIMIT ?
      OFFSET ?;
    `;

    const [result] = await db.query(
      sql,
      loggedInUserId ? [loggedInUserId, limit, offset] : [limit, offset]
    );

    return result as IUserPost[];
  }

  async function selectPostsByUserId({
    userId,
    loggedInUserId,
    page,
    pageSize
  }: {
    userId: number;
    loggedInUserId?: number;
    page: number;
    pageSize: number;
  }): Promise<IUserPost[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // this query is fetching all posts from database that are created by the user with the given userId
    // if is_shared is true, it will also fetch the shared_post_text and shared_media_location columns from the shared post that is defined by shared_post_id
    // as user cannot like their own post, is_liked column is not fetched

    const sql = `
    WITH CTE AS (
      SELECT 
        up.*,
        json_object(
          'id', upr.id,
          'username', upr.username,
           'avatar_url', upr.avatar_url
        ) AS post_owner,
        CASE
        WHEN up.is_shared = 1 THEN JSON_OBJECT(
            'post_owner', JSON_OBJECT('id', spr.id, 'username', spr.username, 'avatar_url', spr.avatar_url),
            'post_text', sp.post_text,
            'media_location', sp.media_location,
            'created_at', sp.created_at
        )
        ELSE NULL 
        END AS shared_post
        ${
          loggedInUserId && loggedInUserId !== userId
            ? ",CASE WHEN pl.profile_id = ? AND pl.created_at IS NOT NULL THEN 1 END AS is_liked"
            : ""
        }
        FROM user_post up
        ${
          loggedInUserId && loggedInUserId !== userId
            ? " LEFT JOIN post_like pl ON up.id = pl.post_id"
            : ""
        }
          LEFT JOIN user_post sp ON up.shared_post_id = sp.id
          LEFT JOIN user_profile upr ON upr.id = up.profile_id
          LEFT JOIN user_profile spr ON sp.profile_id = spr.id
          WHERE up.profile_id = ?
      )
      ${
        loggedInUserId && loggedInUserId !== userId
          ? `
      SELECT *
        FROM (
          SELECT *,
          ROW_NUMBER() OVER (PARTITION BY id ORDER BY is_liked DESC) AS rn
          FROM CTE
        ) AS Ranked
        WHERE rn = 1`
          : `SELECT * FROM CTE`
      }
      LIMIT ?
      OFFSET ?;
    `;

    const [result] = await db.query(
      sql,
      loggedInUserId
        ? [loggedInUserId, userId, limit, offset]
        : [userId, limit, offset]
    );

    return result as IUserPost[];
  }

  async function selectPostById({
    postId,
    loggedInUserId
  }: {
    postId: number;
    loggedInUserId?: number;
  }) {
    const sql = `
    WITH CTE AS (
    SELECT 
        up.*,
        json_object(
          'id', upr.id,
          'username', upr.username,
           'avatar_url', upr.avatar_url
        ) AS post_owner,
        CASE
        WHEN up.is_shared = 1 THEN JSON_OBJECT(
            'post_owner', JSON_OBJECT('id', spr.id, 'username', spr.username, 'avatar_url', spr.avatar_url),
            'post_text', sp.post_text,
            'media_location', sp.media_location,
            'created_at', sp.created_at
        )
        ELSE NULL 
        END AS shared_post
      ${
        loggedInUserId
          ? ",CASE WHEN pl.profile_id = ? AND pl.created_at IS NOT NULL THEN 1 END AS is_liked"
          : ""
      }
      FROM user_post up
      LEFT JOIN user_profile upr ON up.profile_id = upr.id
      LEFT JOIN user_post sp ON up.shared_post_id = sp.id
      LEFT JOIN user_profile spr ON sp.profile_id = spr.id
      ${loggedInUserId ? "LEFT JOIN post_like pl ON up.id = pl.post_id" : ""}
      WHERE up.id = ?
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
      WHERE rn = 1`
        : `SELECT * FROM CTE`
    }
    `;

    const [post] = await db.query(
      sql,
      loggedInUserId ? [loggedInUserId, postId] : [postId]
    );

    return (post as IUserPost[])[0];
  }

  async function createPost({
    userId,
    postCreateData
  }: {
    userId: number;
    postCreateData: PostCreateDataType;
  }): Promise<IUserPost> {
    const sql = `
    INSERT INTO user_post (profile_id, post_text, media_location, is_shared, shared_post_id, created_at)
    VALUES (?, ?, ?, ?, ?, NOW());
    `;

    const { post_text, media_location, shared_post_id } = postCreateData;
    const [result] = await db.query(sql, [
      userId,
      post_text,
      media_location,
      shared_post_id ? true : false,
      shared_post_id
    ]);

    //TODO: refactor this in the future?
    if (shared_post_id) {
      await db.query(
        `UPDATE user_post 
          SET share_count = share_count + 1 
          WHERE id = ?`,
        [shared_post_id]
      );
    }

    const [postRecord] = await db.query(
      "SELECT * FROM user_post WHERE id = ?",
      [(result as ResultSetHeader).insertId]
    );

    return (postRecord as IUserPost[])[0];
  }

  async function updatePost({
    postId,
    postUpdateData
  }: {
    postId: number;
    postUpdateData: PostUpdateDataType;
  }): Promise<IUserPost> {
    const sql = `
    UPDATE user_post
      SET ?
      WHERE id = ?
    `;

    await db.query(sql, [{ ...postUpdateData }, postId]);

    const [postRecord] = await db.query(
      "SELECT * FROM user_post WHERE id = ?",
      [postId]
    );

    return (postRecord as IUserPost[])[0];
  }

  //TODO: what happens when post that is shared in other posts is deleted?
  async function deletePost({ postId }: { postId: number }): Promise<{}> {
    const sql = `
    DELETE FROM user_post
      WHERE id = ?
    `;

    await db.query(sql, [postId]);

    return {};
  }

  async function likePost({
    userId,
    postId
  }: {
    userId: number;
    postId: number;
  }): Promise<IUserPost> {
    // this query is inserting a new record into post_like table
    // if the record already exists, it will update the created_at column to null to unlike the post

    const sql = `
    INSERT INTO post_like (post_id, profile_id, created_at)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE created_at = IF(created_at IS NULL, NOW(), NULL);
    `;

    await db.query(sql, [postId, userId]);

    const [postRecord] = await db.query(
      "SELECT * FROM user_post WHERE id = ?",
      [postId]
    );

    return (postRecord as IUserPost[])[0];
  }

  return Object.freeze({
    selectAllPosts,
    selectPostsByUserId,
    selectPostById,
    createPost,
    updatePost,
    deletePost,
    likePost
  });
}
