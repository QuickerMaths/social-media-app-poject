import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  database: "socialy-db",
  user: "root",
  password: "password"
});

export default connection;
