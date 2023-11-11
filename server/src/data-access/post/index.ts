import db from "../../../db/db.ts";
import makePostDb from "./post-db.ts";

const postDb = makePostDb({ db });

export default postDb;
