import mysql from "mysql2";
import config from "../src/config/config.js";

const connection = mysql
  .createConnection({
    database: config.db.database,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
  })
  .promise();

export default connection;
