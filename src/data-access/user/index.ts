import db from "../../../db/db.ts";
import makeUserDB from "./user-db.ts";

const userDB = makeUserDB({ makeDb: db });

export default userDB;
