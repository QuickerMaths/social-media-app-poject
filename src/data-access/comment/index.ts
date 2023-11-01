import db from "../../../db/db.ts";
import makeCommentDb from "./comment-db.ts";

const commentDb = makeCommentDb({ db });

export default commentDb;
