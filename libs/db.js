// connection.js
const mysql = require("mysql2/promise");

// Parse the connection URI

// Extract connection details
const host = "appelearning.c9oysu6q83x5.us-east-2.rds.amazonaws.com";
const user = "admin";
const password = "admin123";
const database = "railway";
const port = 3306;

// Create a MySQL connection pool
const db = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  waitForConnections: true,
  connectionLimit: 0,
  queueLimit: 0,
});

module.exports = db;
