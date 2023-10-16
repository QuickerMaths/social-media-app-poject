import connection from "../../../db/db.ts";
import makePostDb from "./post-db.ts";

const postDb = makePostDb({ db: connection });

export default postDb;
