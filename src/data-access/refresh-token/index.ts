import db from "../../../db/db.ts";
import makeRefreshTokenDb from "./refresh-token-db.ts";

const refreshTokenDb = makeRefreshTokenDb({ db });

export default refreshTokenDb;
