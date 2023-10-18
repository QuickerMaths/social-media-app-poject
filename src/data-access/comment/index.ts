import connection from "../../../db/db.ts";
import makeCommentDb from "./comment-db.ts";

const commentDb = makeCommentDb({ db: connection });

export default commentDb;
