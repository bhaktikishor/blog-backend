const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to DB:", process.env.DB_HOST);
//   // console.log("connected to MySQL");
// });

module.exports = connection;
