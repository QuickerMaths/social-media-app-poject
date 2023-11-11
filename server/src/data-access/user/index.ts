import db from "../../../db/db.ts";
import makeUserDB from "./user-db.ts";

const userDB = makeUserDB({ db });

export default userDB;
