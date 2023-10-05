import connection from "../../../db/db.ts";
import makeUserDB from "./user-db.ts";

const userDB = makeUserDB({ db: connection });

export default userDB;
